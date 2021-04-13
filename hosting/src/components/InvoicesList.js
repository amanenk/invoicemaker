
import React, { Component } from 'react';
import { Button, ButtonGroup, Container, Table } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import InvoicesService from '../services/InvoicesService';

import { LinkContainer } from 'react-router-bootstrap'

export default class InvoicesList extends Component {
    constructor(props) {
        super(props);
        this.state = { invoices: [], isLoading: true };
        this.remove = this.remove.bind(this);
        //init invoice service
        this.invocesService = new InvoicesService(props.user);
    }

    componentDidMount = () => {
        this.invocesService.getAll().then(data => this.onDataChange(data));
    }

    componentWillUnmount = () => {
        this.invocesService.getAll().then(data => this.onDataChange(data));
    }

    onDataChange = (items) => {
        console.log(items);
        let invoices = [];
        items.forEach(item => {
            invoices.push({
                key: item.id,
                date: item.date,
                amount: item.amount,
                currency: item.currency,
            });
        });

        this.setState({
            invoices: invoices,
            isLoading: false
        });
    }

    async remove(key) {
        this.invocesService.delete(key)
            .then(() => {
                let updatedInvoices = [...this.state.invoices].filter(i => i.key !== key);
                this.setState({ invoices: updatedInvoices });
            });
    }

    render() {
        const { invoices, isLoading } = this.state;

        if (isLoading) {
            return <p>Loading...</p>;
        }

        const invoiceList = invoices.map(invoice => {
            return <tr key={invoice.key}>
                <td style={{ whiteSpace: 'nowrap' }}>{invoice.date}</td>
                <td>{invoice.currency}{invoice.amount}</td>
                <td>
                    <ButtonGroup>
                        <LinkContainer to={`/invoice/${invoice.key}`}>
                            <Button size="sm" variant="primary" tag={Link} to={"/invoices/" + invoice.key}>Edit</Button>
                        </LinkContainer>
                        <Button size="sm" variant="success">Download</Button>
                        <Button size="sm" variant="danger" onClick={() => this.remove(invoice.key)}>Delete</Button>
                    </ButtonGroup>
                </td>
            </tr>
        });

        return (
            <div>
                <Container fluid>
                    <div className="float-right">
                        <LinkContainer to="/invoice/new">
                            <Button color="success">Add Invoice</Button>
                        </LinkContainer>
                    </div>
                    <h3>Invoices</h3>
                    <Table className="mt-4">
                        <thead>
                            <tr>
                                <th width="20%">Date</th>
                                <th width="20%">Amount</th>
                                <th width="10%">Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {invoiceList}
                        </tbody>
                    </Table>
                </Container>
            </div>
        );
    }
}