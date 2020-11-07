import { ChangeEvent, FormEvent, useState } from "react";
import React from "react";
import { AuthenticationResult } from "./authentication/authenticationResult";
import { AuthenticationService } from "./authentication/authentication-service";
import { HttpClient } from "../shared/http-client";

type LoginFormProps = {
    onSuccessfulLoginEvent(): void
}



export function LoginForm(props: LoginFormProps) {
    const [login, setLogin] = useState('');
    const [password, setPassword] = useState('');
    const [errorMessage , setErrorMessage] = useState<string | null>(null);

    function handleSubmit(event: FormEvent<HTMLFormElement>) {

        var formdata = new FormData();
        formdata.append("client_id", "ro.client");
        formdata.append("grant_type", "password");
        formdata.append("username", login);
        formdata.append("client_secret", "secret");
        formdata.append("password", password);

        HttpClient.postForm<AuthenticationResult>("connect/token", formdata)
            .then(data => AuthenticationService.authenticate(data, login))
            .then(() => props.onSuccessfulLoginEvent())
            .catch(() => {
                setErrorMessage('Invalid username or password');
                setPassword('');
            });



        event.preventDefault();
    }

    function handleLoginChange(event: ChangeEvent<HTMLInputElement>) {
        setLogin(event.target.value)
    }

    function handlePasswordChange(event: ChangeEvent<HTMLInputElement>) {
        setPassword(event.target.value);
    }

    return (
        <div>
            {errorMessage !== null &&
                <div>{errorMessage}</div>
            }

            <form onSubmit={handleSubmit}>
                <div>
                    <div>Login: </div><div><input type="text" value={login} onChange={handleLoginChange} /></div>
                    <div>Password: </div><div><input type="password" value={password} onChange={handlePasswordChange} /></div>
                    <div><input type="submit" value="Log in" /></div>
                </div>
            </form>
        </div>
    );
}