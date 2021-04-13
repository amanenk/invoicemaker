import { firestore } from './firebase';

export default class InvoicesService {
    constructor(userId) {
        this.userId = userId
        this.invoices = firestore.collection(`/invoices`);
    }

    async addInvoice(invoice) {
        invoice.user_id = this.userId;
        invoice.createdAt = Date.now();
        console.log("creating invoice", invoice);
        const res = await this.invoices.add(invoice);
        console.log(res)
        return res.id
    };

    async getAll() {
        var invoices = [];
        const snapshot = await this.invoices.where("user_id", "==", this.userId).get();

        if (snapshot.empty) {
            console.log('No matching documents.');
            return [];
        }

        snapshot.forEach(doc => {
            // console.log(doc.id, '=>', doc.data());
            var id = doc.id;
            var data = doc.data();
            invoices.push({
                id: id,
                ...data
            });
        });

        return invoices;
    }

    async get(key) {
        const snapshot = await this.invoices.doc(key).get();
        if (snapshot.empty) {
            console.log('invoice does not exist.');
            return null;
        }

        let response = {};
        var data = snapshot.data();
        data.id = snapshot.id;
        response = data;    

        return response;
    }

    async update(key, value) {
        const res = await this.invoices.doc(key).set({
            ...value
        }, { merge: true });
        console.log(res)
    }

    async delete(key) {
        await this.invoices.doc(key).delete();
    }
}

