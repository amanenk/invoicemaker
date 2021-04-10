package main

import (
	"cloud.google.com/go/pubsub"
	"fmt"
	"github.com/fdistorted/pdfGenerator/config"
	u "github.com/fdistorted/pdfGenerator/pdf"
	"golang.org/x/net/context"
	"google.golang.org/api/option"
	"log"
	"time"
)

type InvoiceItem struct {
	Title    string
	Quantity float32
	Rate     float32
	Amount   float32
}

type InvoiceData struct {
	Logo          *string
	InvoiceId     string
	InvoiceFrom   string
	BillTo        string
	Date          time.Time
	DateFormatted string
	Currency      string
	Items         []InvoiceItem
	Total         float32
	Notes         *string
	Terms         *string
	Signature     *string
}

func createPdf() {
	start := time.Now()
	r := u.NewRequestPdf("")

	//html template path
	templatePath := "templates/sample.html"

	//path for download pdf
	outputPath := "storage/testpdf.pdf"

	invoiceItems := []InvoiceItem{
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
	templateData := InvoiceData{
		Logo:        &logo,
		InvoiceId:   "test123",
		InvoiceFrom: "Sparksuite, Inc. 12345 Sunny Road Sunnyville, CA 12345",
		BillTo:      "Sparksuite, Inc. 12345 Sunny Road Sunnyville, CA 12345",
		Date:        time.Now(),

		Currency: "$",
		Items:    invoiceItems,
		Total:    total,
		//Notes:    &notes,
		//Terms:    &terms,
		Signature: &signature,
	}

	templateData.DateFormatted = templateData.Date.Format("January 2, 2006")

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
	client, err := pubsub.NewClient(ctx, c.ProjectId, option.WithCredentialsJSON([]byte(c.Credentials)))
	if err != nil {
		log.Fatalf("pubsub.NewClient: %v", err)
	}

	sub := client.Subscription(c.SubId)
	err = sub.Receive(ctx, func(ctx context.Context, msg *pubsub.Message) {
		createPdf()
		fmt.Printf("Got message: %q\n", string(msg.Data))
		msg.Ack()
	})

	if err != nil {
		log.Fatalf("Receive: %v", err)
	}

}
