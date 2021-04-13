import React, { useContext } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import "./App.css"
import Navbar from "./Navbar"
import Landing from "./Landing"
import MyInvoices from "./MyInvoices"
import { UserContext } from "./providers/UserProvider";
import Spinner from 'react-bootstrap/Spinner';

export default function App() {
  const { authLoaded } = useContext(UserContext);
  if (!authLoaded) {
    console.log("show loading")
    return (
      <div className="d-flex justify-content-center loader">
        <Spinner animation="grow" variant="primary" />
      </div>
    );
  }

  console.log("show content")
  return (
    <Router>
      <Navbar />
      <div className="App">
        <Switch>
          <Route exact path="/">
            <Landing />
          </Route>
          <Route path="/my-invoices">
            <MyInvoices />
          </Route>
        </Switch>
      </div>
    </Router>
  )
}

