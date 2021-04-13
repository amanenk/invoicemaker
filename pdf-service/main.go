package main

import (
	"cloud.google.com/go/pubsub"
	"encoding/json"
	"fmt"
	"github.com/fdistorted/pdfGenerator/config"
	"github.com/fdistorted/pdfGenerator/db"
	"github.com/fdistorted/pdfGenerator/models"
	u "github.com/fdistorted/pdfGenerator/pdf"
	"golang.org/x/net/context"
	"google.golang.org/api/option"
	"log"
	"time"
)

func createPdf() {
	start := time.Now()
	r := u.NewRequestPdf("")

	//html template path
	templatePath := "templates/sample.html"

	//path for download pdf
	outputPath := "storage/testpdf.pdf"

	invoiceItems := []models.InvoiceItem{
		{Title: "hello", Quantity: 10, Rate: 12.5},
		{Title: "hello1", Quantity: 2.5, Rate: 22.5},
	}

	var total float32

	for i := range invoiceItems {
		invoiceItems[i].Amount = invoiceItems[i].Quantity * invoiceItems[i].Rate
		total += invoiceItems[i].Amount
	}

	logo := "https://www.sparksuite.com/images/logo.png"
	//notes := "test notes"
	//terms := "test terms"
	signature := "https://p.kindpng.com/picc/s/26-264820_signatures-samples-png-ron-paul-signature-transparent-png.png"

	//html template data
	templateData := models.InvoiceData{
		Logo:        &logo,
		InvoiceId:   "test123",
		InvoiceFrom: "Sparksuite, Inc. 12345 Sunny Road Sunnyville, CA 12345",
		BillTo:      "Sparksuite, Inc. 12345 Sunny Road Sunnyville, CA 12345",

		Currency: "$",
		Items:    invoiceItems,
		Total:    total,
		//Notes:    &notes,
		//Terms:    &terms,
		Signature: &signature,
	}

	//templateData.DateFormatted = templateData.Date.Format("January 2, 2006")

	if err := r.ParseTemplate(templatePath, templateData); err == nil {
		ok, _ := r.GeneratePDF(outputPath)
		fmt.Println(ok, "pdf generated successfully")
		fmt.Println(time.Now().Sub(start))
	} else {
		fmt.Println(err)
	}
}

func main() {
	c := config.ReadConfig()
	log.Printf("Config:\n %+v", c)

	ctx := context.Background()

	jsonBytes := []byte(c.Credentials)
	//init pubsub
	client, err := pubsub.NewClient(ctx, c.ProjectId, option.WithCredentialsJSON(jsonBytes))
	if err != nil {
		log.Fatalf("pubsub.NewClient: %v", err)
	}

	////init database
	dbClient := db.FirestoreNew(jsonBytes)

	sub := client.Subscription(c.SubId)
	log.Println("listening to subscription...")

	err = sub.Receive(ctx, func(ctx context.Context, msg *pubsub.Message) {
		//createPdf()

		fmt.Printf("Got message: %q\n", string(msg.Data))

		var msgData models.PubSubPayload
		err := json.Unmarshal([]byte(msg.Data), &msgData)
		test, err := dbClient.GetInvoice(msgData.InvoiceId)
		if err != nil {
			_ = fmt.Errorf("failed to get invoice data %+v\n", err)
		}
		log.Printf("got invoice %+v\n", test)
		msg.Ack()
	})

	if err != nil {
		log.Fatalf("Receive: %v", err)
	}

	log.Println("exiting...")

}
