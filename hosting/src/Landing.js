import React from "react";
import { Link } from "react-router-dom";
import Jumbotron from 'react-bootstrap/Jumbotron';
export default function Dashboard() {
    return (
        <Jumbotron>
            <h1>Simple Invoice Maker</h1>
            <p>
                This is a simple tool to create store, generate pdf of the for your invoices.
                Right now it generates very simple pdf invoices but in the future the re will be a posibility to add the signature and your brand logo.
            </p>
            <p>
                You can login with google to start using it.
            </p>

            the location’s pathname, search, and hash properties.



            <Link to="/my-invoices">My Invoices</Link>

        </Jumbotron>

    );
}
