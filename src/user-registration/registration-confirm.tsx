import React, { useEffect, useState } from 'react';
import {
    useParams
} from "react-router-dom";
import { HttpClient } from '../shared/http-client';

interface RegistrationConfirmUrlParams {
    registrationId: string;
}

export function RegistrationConfirm() {
    const { registrationId } = useParams<RegistrationConfirmUrlParams>();
    const [isConfirmSuccessful, setIsConfirmSuccessful] = useState(false);

    useEffect(() => {
        confirmRegistration();
    }, []);

    function confirmRegistration() {
        HttpClient.patch<any>(`userAccess/userRegistrations/${registrationId}/confirm`, null)
            .then(() => setIsConfirmSuccessful(true));
    }

    return (
        <div>
            {isConfirmSuccessful &&
                <div>
                    Your registration is confirmed. You can log in to application.
                </div>
            }
        </div>
    )
}