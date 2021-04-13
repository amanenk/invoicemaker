
import React, { Component } from 'react';
import { Link, withRouter } from 'react-router-dom';
import { Button, Container, Form, Row, Col } from 'react-bootstrap';
import InvoicesService from '../services/InvoicesService';
import NumericInput from 'react-numeric-input';

import { LinkContainer } from 'react-router-bootstrap'

class InvoiceEdit extends Component {

    emptyInvoice = {
        from: '',
        to: '',
        invoiceDate: "",
        invoiceId: '',
        currency: '',
        terms: '',
        notes: '',
        items: []
    };

    constructor(props) {
        super(props);
        this.state = {
            invoice: this.emptyInvoice,
        };
        this.invocesService = new InvoicesService(props.userId);
    }

    componentDidMount = () => {
        let key = this.props.match.params.key
        if (key !== 'new') {

            this.invocesService.get(key).then(data => this.onDataChange(data))
        }
    }

    componentWillUnmount = () => {
        this.invocesService.getAll().then(data => this.onDataChange(data))
    }

    onDataChange = (invoice) => {
        this.setState({
            invoice,
        });
    }

    handleChange = (e) => {
        const target = e.target;
        const value = target.value;
        const name = target.name;
        let invoice = { ...this.state.invoice };
        invoice[name] = value;
        this.setState({ invoice });
    };

    handleItemChange = (e, key, isNumeric) => {
        if (isNumeric) {
            var value = e.valueAsNumber;
            var name = e.input.name;
        }
        else {
            var value = e.target.value;
            var name = e.target.name;
        }

        // console.log(name, value, key)
        var { invoice } = this.state;

        var index = invoice.items.findIndex(function (o) {
            return o.id === key;
        })
        console.log("index to update", index)
        invoice.items[index][name] = value
        console.log(invoice.items)

        this.setState({ invoice });
    };

    addItem = () => {
        var { invoice } = this.state;
        let highestId = 0;
        for (let item of invoice.items) {
            if (item.id > highestId)
                highestId = item.id;
        }
        invoice.items.push({ id: highestId + 1 });
        this.setState({ invoice });
    }


    handleSubmit = async (e) => {
        e.preventDefault();
        const { invoice } = this.state;
        let key = this.props.match.params.key
        if (key !== 'new') {
            await this.invocesService.update(key, invoice);
        } else {
            await this.invocesService.addInvoice(invoice);
        }

        this.props.history.push('/my-invoices');
    };

    render = () => {
        const { invoice } = this.state;
        const title = <h2>{invoice.id ? 'Edit Invoice' : 'Add Invoice'}</h2>;

        // console.log("invoice items", invoice.items);
        let RenderedInvoiceItems = invoice.items.map(i => {
            return (
                <Row key={i.id}>
                    <Col>
                        <Form.Control name="title" onChange={(e) => this.handleItemChange(e, i.id)} type="text" placeholder="Title" value={i.title || ''} />
                    </Col>
                    <Col>
                        <NumericInput className="form-control" name="quantity" onChange={(valueAsNumber, valueAsString, input) => this.handleItemChange({ valueAsNumber, valueAsString, input }, i.id, true)} type="text" placeholder="Quantity" value={i.quantity || ''} />
                    </Col>
                    <Col>
                        <NumericInput className="form-control" name="rate" onChange={(valueAsNumber, valueAsString, input) => this.handleItemChange({ valueAsNumber, valueAsString, input }, i.id, true)} type="text" placeholder="Rate" value={i.rate || ''} />
                    </Col>
                    <Col>
                        <Form.Label  >{invoice.currency}{i.rate * i.quantity}</Form.Label>
                    </Col>
                    <Col>
                        <Button variant="danger" onClick={() => {
                            var index = invoice.items.findIndex(function (o) {
                                return o.id === i.id;
                            });
                            console.log("index to delete", index)
                            if (index !== -1) invoice.items.splice(index, 1);
                            this.setState({ invoice })
                        }}>delete</Button>
                    </Col>

                </Row>
            )
        });



        return (
            <div>
                <Container>
                    {title}
                    <Form onSubmit={this.handleSubmit}>
                        <Form.Group>
                            <Form.Label >Invoice Number</Form.Label>
                            <Form.Control type="text" name="invoiceId" id="invoiceId" value={invoice.invoiceId || ''}
                                onChange={this.handleChange} autoComplete="invoiceId" />
                        </Form.Group>
                        <Form.Group>
                            <Form.Label >Invoice Date</Form.Label>
                            <Form.Control type="text" name="invoiceDate" id="invoiceDate" value={invoice.invoiceDate || ''}
                                onChange={this.handleChange} autoComplete="invoiceDate" />
                        </Form.Group>

                        <Form.Group>
                            <Form.Label >From</Form.Label>
                            <Form.Control type="text" name="from" id="from" value={invoice.from || ''}
                                onChange={this.handleChange} autoComplete="from" />
                        </Form.Group>
                        <Form.Group>
                            <Form.Label >To</Form.Label>
                            <Form.Control type="text" name="to" id="to" value={invoice.to || ''}
                                onChange={this.handleChange} autoComplete="to" />
                        </Form.Group>

                        <Form.Group>
                            <Form.Label>Invoice Currency</Form.Label>
                            <Form.Control type="text" name="currency" id="currency" value={invoice.currency || ''}
                                onChange={this.handleChange} autoComplete="currency" />
                        </Form.Group>
                        <Form.Group>
                            <Form.Label>Notes</Form.Label>
                            <Form.Control type="text" name="notes" id="notes" value={invoice.notes || ''}
                                onChange={this.handleChange} autoComplete="notes" />
                        </Form.Group>
                        <Form.Group>
                            <Form.Label>Terms</Form.Label>
                            <Form.Control type="text" name="terms" id="terms" value={invoice.terms || ''}
                                onChange={this.handleChange} autoComplete="terms" />
                        </Form.Group>
                        <Form.Group>
                            <Row >
                                <Col>
                                    <Form.Label >Title</Form.Label>
                                </Col>
                                <Col>
                                    <Form.Label >Quantity</Form.Label>
                                </Col>
                                <Col>
                                    <Form.Label >Rate</Form.Label>
                                </Col>
                                <Col>
                                    <Form.Label >Amount</Form.Label>
                                </Col>
                                <Col>
                                </Col>
                            </Row>
                            {RenderedInvoiceItems}
                            <Button color="primary" onClick={this.addItem}>add item</Button>
                        </Form.Group>
                        <Form.Group>
                            <Button color="primary" type="submit">Save</Button>{' '}
                            <LinkContainer to="/my-invoices">
                                <Button color="secondary">Cancel</Button>
                            </LinkContainer>
                        </Form.Group>
                    </Form>
                </Container>
            </div>
        );

    }
}

export default withRouter(InvoiceEdit);