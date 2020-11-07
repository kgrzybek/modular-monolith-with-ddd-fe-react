import { FormEvent, useState } from "react";
import React from "react";
import { HttpClient } from "../shared/http-client";

interface RegisterNewUserRequest {
    login: string,
    password: string,
    email: string,
    firstName: string,
    lastName: string,
    confirmLink: string
}

export function UserRegistrationForm() {
    const [login, setLogin] = useState('');
    const [password, setPassword] = useState('');
    const [email, setEmail] = useState('');
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [errorMessage, setErrorMessage] = useState<string | null>(null);
    const [successMessage, setSuccessMessage] = useState<string | null>(null);

    function handleSubmit(event: FormEvent<HTMLFormElement>) {
        var confirmLink = `${window.location.origin}/registration-confirm/`;
        console.log(confirmLink);
        const request: RegisterNewUserRequest = {
            login: login,
            email: email,
            firstName: firstName,
            lastName: lastName,
            password: password,
            confirmLink: confirmLink
        }

        HttpClient.post<any>("userAccess/userRegistrations", JSON.stringify(request))
            .then(() => handleUserRegistrationSuccess())
            .catch(() => {
                setErrorMessage('Error during registration');
            });

        event.preventDefault();
    }

    function handleUserRegistrationSuccess() {
        setSuccessMessage('Registration success');
    }

    return (
        <div>
            {successMessage !== null &&
                <div>{successMessage}</div>
            }
            {errorMessage !== null &&
                <div>{errorMessage}</div>
            }

            {successMessage === null &&
                <form onSubmit={handleSubmit}>
                    <div>
                        <div>Login: </div><div><input type="text" value={login} onChange={event => setLogin(event.target.value)} /></div>
                        <div>Password: </div><div><input type="password" value={password} onChange={event => setPassword(event.target.value)} /></div>
                        <div>Email: </div><div><input type="text" value={email} onChange={event => setEmail(event.target.value)} /></div>
                        <div>First Name: </div><div><input type="text" value={firstName} onChange={event => setFirstName(event.target.value)} /></div>
                        <div>Last Name: </div><div><input type="text" value={lastName} onChange={event => setLastName(event.target.value)} /></div>
                        <div><input type="submit" value="Register" /></div>
                    </div>
                </form>
            }
        </div>
    );
}