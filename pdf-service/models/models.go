package models

type InvoiceItem struct {
	Title    string  `firestore:"title"`
	Quantity float32 `firestore:"quantity"`
	Rate     float32 `firestore:"rate"`
	Amount   float32 `firestore:"amount"`
}

type InvoiceData struct {
	Logo          *string       `firestore:"logo"`
	InvoiceId     string        `firestore:"invoiceId"`
	InvoiceFrom   string        `firestore:"from"`
	BillTo        string        `firestore:"to"`
	DateFormatted string        `firestore:"invoiceDate"`
	Currency      string        `firestore:"currency"`
	Items         []InvoiceItem `firestore:"items"`
	Total         float32       `firestore:"total"`
	Notes         *string       `firestore:"notes"`
	Terms         *string       `firestore:"terms"`
	Signature     *string       `firestore:"signature"`
}

type PubSubPayload struct {
	InvoiceId string `json:"invoiceId"`
}
