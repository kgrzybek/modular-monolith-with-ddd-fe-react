import React, { useEffect, useState } from 'react';
import {
    BrowserRouter as Router,
    Route,
    Link
} from 'react-router-dom';
import { HttpClient } from '../../shared/http-client';

interface SubscriptionDetails {
    subscriptionId: string,
    period: string,
    expirationDate: Date,
    status: string
}

export function SubscriptionDetails() {

    const [subscriptionDetails, setSubscriptionDetails] = useState<SubscriptionDetails | null>(null);

    useEffect(() => {
        loadSubscription();
    }, []);

    function loadSubscription() {
        HttpClient.get<SubscriptionDetails>('api/payments/payers/authenticated/subscription')
            .then(response => setSubscriptionDetails(response));
    }

    return (
        <div className="container">
            Subscription details

            {subscriptionDetails !== null &&
                <div>
                    <div>ID: {subscriptionDetails.subscriptionId} </div>
                    <div>Period: {subscriptionDetails.period} </div>
                    <div>Status: {subscriptionDetails.status} </div>
                    <div>Expire: {subscriptionDetails.expirationDate} </div>
                </div>
            }

            {subscriptionDetails === null &&
                <div>
                    <div>You don't have a subscription</div>
                    <div>
                        <Link to="/subscription/buy">Buy subscription</Link>
                    </div>
                </div>
            }
        </div>
    )
}