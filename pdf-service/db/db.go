package db

import (
	"cloud.google.com/go/firestore"
	"context"
	"fmt"
	"github.com/fdistorted/pdfGenerator/models"
	"log"

	firebase "firebase.google.com/go"
	"google.golang.org/api/option"
)

type FirestoreClient struct {
	firestoreClient *firestore.Client
}

func FirestoreNew(jsonCredentials []byte) *FirestoreClient {
	// Use a service account
	ctx := context.Background()
	sa := option.WithCredentialsJSON(jsonCredentials)
	app, err := firebase.NewApp(ctx, nil, sa)
	if err != nil {
		log.Fatalln(err)
	}

	client, err := app.Firestore(ctx)
	if err != nil {
		log.Fatalln(err)
	}

	fClient := FirestoreClient{client}
	return &fClient
}

func (f *FirestoreClient) GetInvoice(id string) (*models.InvoiceData, error) {
	doc, err := f.firestoreClient.Collection("invoices").Doc(id).Get(context.TODO())
	if err != nil {
		return nil, err
	}

	if !doc.Exists() {
		return nil, fmt.Errorf("document does not exist")
	}

	var invoice models.InvoiceData
	err = doc.DataTo(&invoice)
	if err != nil {
		fmt.Println("error:", err)
	}
	fmt.Printf("map invoice %+v\n", doc.Data())
	fmt.Printf("formatted invoice %+v\n", invoice)
	log.Println(doc.Data())
	return &invoice, nil
}
