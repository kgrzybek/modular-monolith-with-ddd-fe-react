import React, { useEffect, useState } from 'react';
import {
    BrowserRouter as Router,
    useLocation,
    Link
} from "react-router-dom";
import { HttpClient } from '../../shared/http-client';

interface MarkSubscriptionPaymentAsPaidRequest {
    paymentId: string
}

export function SubscriptionPaymentSuccess() {

    var paymentId = useQuery().get('paymentId');

    const [message, setMessage] = useState('');

    function useQuery() {
        return new URLSearchParams(useLocation().search);
    }

    useEffect(() => {
        markSubscriptionPaymentAsPaid();
    }, []);

    function markSubscriptionPaymentAsPaid() {
        if(paymentId != null) {
            const request: MarkSubscriptionPaymentAsPaidRequest = {
                paymentId: paymentId
            }
            HttpClient.post('api/payments/subscriptionPayments', JSON.stringify(request))
            .then(() => setMessage('Payment successful'))
        }
    }

    return (
        <div className="container">
            {message}
        </div>
    )
}