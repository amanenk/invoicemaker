import React, { useEffect, useContext, useState } from "react";
import { UserContext } from "./providers/UserProvider";
import InvoicesList from "./components/InvoicesList"
import { Redirect } from "react-router-dom";
export default function MyInvoices() {
    const {user} = useContext(UserContext);
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

    if (!user) {
        return (
            <div className="mt-2">
                Not Authorized
            </div>
        )
    }

    return (
        <div className="mt-2">
            <InvoicesList user={user.uid} />
        </div>
    );
}
