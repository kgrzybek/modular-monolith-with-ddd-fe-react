import React, { useEffect, useState } from 'react';
import {
    BrowserRouter as Router,
    useLocation,
    Link
} from "react-router-dom";

export function SubscriptionPaymentStatus() {

    var paymentId = useQuery().get('paymentId');

    function useQuery() {
        return new URLSearchParams(useLocation().search);
    }

    function getSuccessLink() : string {
        return `/subscription/payment-success?paymentId=${paymentId}`;
    }

    return (
        <div className="container">
            Subscription Payment status {paymentId}
            <Link to={getSuccessLink()}>Mark payment successful</Link>
        </div>
    )
}