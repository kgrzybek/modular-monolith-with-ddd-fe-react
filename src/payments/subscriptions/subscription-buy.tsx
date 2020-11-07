import React, { ChangeEvent, FormEvent, useEffect, useState } from 'react';
import { Country } from '../../shared/country';
import { SubscriptionType } from './subscriptionType';
import { useHistory } from "react-router-dom";
import { HttpClient } from '../../shared/http-client';

interface BuySubscriptionRequest {
    subscriptionTypeCode: string,
    countryCode: string,
    value: number,
    currency: string
}

interface MoneyValue {
    value: number,
    currency: string
}

class SubscriptionPrice {

    public value: number = 0;

    public currency: string = '';

    constructor(valueMoney: number, currencyMoney: string) {

        this.value = valueMoney;
        this.currency = currencyMoney;
    }
}

export function SubscriptionBuy() {

    const [typeCode, setTypeCode,] = useState(SubscriptionType.MONTH);
    const [countryCode, setCountryCode] = useState('PL');
    const [price, setPrice] = useState<SubscriptionPrice>(new SubscriptionPrice(0, ''));
    const [countries, setCountries] = useState<Array<Country>>([]);

    useEffect(() => {
        loadCountries();
    }, []);

    useEffect(() => {
        getPrice();
    }, []);

    let history = useHistory();

    function loadCountries() {
        HttpClient.get<Array<Country>>('api/meetings/countries')
            .then(response => setCountries(response));
    }

    function getPrice() {
        HttpClient.get<MoneyValue>(`api/payments/priceListItems?countryCode=${countryCode}&categoryCode=New&periodTypeCode=${typeCode}`)
        .then(response => {
            console.log(response);
            setPrice(new SubscriptionPrice(response.value, response.currency));

        });
    }

    function handleSubmit(event: FormEvent<HTMLFormElement>) {
        const request: BuySubscriptionRequest = {
            subscriptionTypeCode: typeCode,
            countryCode: countryCode,
            value: price.value,
            currency: price.currency
        }

        HttpClient.post<Response>('api/payments/subscriptions', JSON.stringify(request))
            .then((response) => response.json() as unknown as string)
            .then((paymentId) => history.push(`/subscription/payment-status?paymentId=${paymentId}`))
            .catch(onrejected => {
            });

        event.preventDefault();
    }

    function handleCountryChange(event: ChangeEvent<HTMLSelectElement>) {
        setCountryCode(event.target.value);
    }

    function handlePeriodChange(event: ChangeEvent<HTMLSelectElement>) {
        setTypeCode(event.target.value);
    }

    return (
        <div className="container">
            <form onSubmit={handleSubmit}>
                <div>
                <div>Period: </div>
                    <div>
                        <select name="Period" 
                        onChange={handlePeriodChange} 
                        onLoadedData={handlePeriodChange} 
                        value={countryCode}>
                            <option label="Month" value={SubscriptionType.MONTH}></option>
                            <option label="6 months" value={SubscriptionType.HALF_YEAR}></option>
                        </select>
                    </div>
                    <div>Country: </div>
                    <div>
                        <select name="Country" 
                        onChange={handleCountryChange} 
                        onLoadedData={handleCountryChange} 
                        value={countryCode}>
                            {countries.map(item =>
                                <option label={item.name} value={item.code}></option>)}
                        </select>
                    </div>
                    <div><input type="submit" value="Send Proposal" /></div>
                </div>
            </form>
            <div>
                Price: {price.value} {price.currency}
            </div>
        </div>
    )
}