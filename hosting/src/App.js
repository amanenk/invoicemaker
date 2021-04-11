import React from "react";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import "./App.css"
import Navbar from "./Navbar"
import Landing from "./Landing"
import MyInvoices from "./MyInvoices"
import Login from "./Login";
import Dashboard from "./Dashboard";
import UserProvider from "./providers/UserProvider";

function App() {
  return (
    <UserProvider>
      <Router>
        <Navbar />
        <div className="App">
          <Switch>
            <Route exact path="/">
              <Landing />
            </Route>
            <Route path="/login">
              <Login />
            </Route>
            <Route path="/my-invoices">
              <MyInvoices />
            </Route>
          </Switch>
        </div>
      </Router>
    </UserProvider>
  )
}

export default App;
