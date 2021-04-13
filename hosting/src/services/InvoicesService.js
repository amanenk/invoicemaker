import { firestore } from './firebase';

export default class InvoicesService {
    constructor(userId) {
        this.userId = userId
        this.invoices = firestore.collection(`/invoices`);
    }

    addInvoice = (invoice) => {
        this.invoices.push(invoice);
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
            invoices.push({ id: id, amount: data.amount, currency: data.currency, date: data.date });
        });

        return invoices;
    }

    get(key) {
        return this.invoices.get().child(key);
    }

    update(key, value) {
        return this.invoices.child(key).update(value);
    }

    delete(key) {
        return this.invoices.child(key).remove();
    }
}

