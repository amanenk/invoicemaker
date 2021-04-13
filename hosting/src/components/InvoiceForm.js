
import React, { Component } from 'react';
import { Link, withRouter } from 'react-router-dom';
import { Button, Container, Form } from 'react-bootstrap';
import InvoicesService from '../services/InvoicesService';

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
    };

    constructor(props) {
        super(props);
        this.state = {
            item: this.emptyInvoice
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

    onDataChange = (item) => {
        this.setState({
            item: item,
        });
    }

    handleChange = (e) => {
        const target = e.target;
        const value = target.value;
        const name = target.name;
        let item = { ...this.state.item };
        item[name] = value;
        this.setState({ item });
    };

    handleSubmit = async (e) => {
        e.preventDefault();
        const { item } = this.state;
        let key = this.props.match.params.key
        if (key !== 'new') {
            await this.invocesService.update(key, item);
        } else {
            await this.invocesService.addInvoice(item);
        }

        this.props.history.push('/my-invoices');
    };

    render = () => {
        const { item } = this.state;
        const title = <h2>{item.id ? 'Edit Invoice' : 'Add Invoice'}</h2>;

        return <div>
            <Container>
                {title}
                <Form onSubmit={this.handleSubmit}>
                    <Form.Group>
                        <Form.Label >Invoice Number</Form.Label>
                        <Form.Control type="text" name="invoiceId" id="invoiceId" value={item.invoiceId || ''}
                            onChange={this.handleChange} autoComplete="invoiceId" />
                    </Form.Group>
                    <Form.Group>
                        <Form.Label >Invoice Date</Form.Label>
                        <Form.Control type="text" name="invoiceDate" id="invoiceDate" value={item.invoiceDate || ''}
                            onChange={this.handleChange} autoComplete="invoiceDate" />
                    </Form.Group>

                    <Form.Group>
                        <Form.Label >From</Form.Label>
                        <Form.Control type="text" name="from" id="from" value={item.from || ''}
                            onChange={this.handleChange} autoComplete="from" />
                    </Form.Group>
                    <Form.Group>
                        <Form.Label >To</Form.Label>
                        <Form.Control type="text" name="to" id="to" value={item.to || ''}
                            onChange={this.handleChange} autoComplete="to" />
                    </Form.Group>

                    <Form.Group>
                        <Form.Label>Invoice Currency</Form.Label>
                        <Form.Control type="text" name="currency" id="currency" value={item.currency || ''}
                            onChange={this.handleChange} autoComplete="currency" />
                    </Form.Group>
                    <Form.Group>
                        <Form.Label>Notes</Form.Label>
                        <Form.Control type="text" name="notes" id="notes" value={item.notes || ''}
                            onChange={this.handleChange} autoComplete="notes" />
                    </Form.Group>
                    <Form.Group>
                        <Form.Label>Terms</Form.Label>
                        <Form.Control type="text" name="terms" id="terms" value={item.terms || ''}
                            onChange={this.handleChange} autoComplete="terms" />
                    </Form.Group>
                    <Form.Group>
                        <Button color="primary" type="submit">Save</Button>{' '}
                        <LinkContainer to="/my-invoices">
                            <Button color="secondary" >Cancel</Button>
                        </LinkContainer>
                    </Form.Group>
                </Form>
            </Container>
        </div>
    }
}

export default withRouter(InvoiceEdit);