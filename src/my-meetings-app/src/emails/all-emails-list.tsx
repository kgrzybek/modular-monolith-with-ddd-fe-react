import React, { useEffect, useState } from 'react';
import { HttpClient } from '../shared/http-client';

interface Email {
    id: string,
    from: string,
    to: string,
    subject: string,
    content: string,
    date: string
}

export function AllEmailsList() {

    const [emails, setEmails] = useState<Array<Email>>([]);

    useEffect(() => {
        loadEmails();
    }, []);

    function loadEmails() {
        HttpClient.get<Array<Email>>('api/userAccess/emails')
            .then(response => setEmails(response));
    }

    return (
        <div>
            {emails.map(email =>
                <div>
                    <div> To: {email.to}, From: {email.from}, Subject: {email.subject}, Date: {email.date} </div>
                    <div dangerouslySetInnerHTML={{__html: email.content}}></div>
                </div>
            )}
        </div>
    )
}