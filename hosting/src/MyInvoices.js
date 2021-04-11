import React, { useEffect, useContext, useState } from "react";
import { UserContext } from "./providers/UserProvider";
import { Redirect } from "react-router-dom";

import Button from 'react-bootstrap/Button';
export default function MyInvoices() {
    const user = useContext(UserContext);
    const [redirect, setredirect] = useState(null);

    useEffect(() => {
        console.log(user)
        if (!user) {
            setredirect("/");
        }
    }, [user]);
    if (redirect) {
        return <Redirect to={redirect} />;
    }

    return (
        <div>
            <p>There are no invoices yet press on the button below to create one</p>
            <Button className="ml-2" variant="secondary" onClick={() => { window.location.reload(); }}>Create Invoice</Button>
        </div>
    );
}
