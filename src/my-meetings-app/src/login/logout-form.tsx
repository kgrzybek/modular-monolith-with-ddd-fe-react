import { FormEvent } from "react";
import React from "react";
import { AuthenticationService } from "./authentication/authentication-service";

type LogOutFormProps = {
    onLogOffEvent(): void
}

export function LogOutForm(props: LogOutFormProps) {
    const username = AuthenticationService.getUsername();

    function handleSubmit(event: FormEvent<HTMLFormElement>) {
        AuthenticationService.logOff();
        props.onLogOffEvent();

        event.preventDefault();
    }

    return (
        <div>
            <div>Welcome, {username}</div>
            <div>
                <form onSubmit={handleSubmit}>
                    <div>
                        <div><input type="submit" value="Log off" /></div>
                    </div>
                </form>
            </div>
        </div>
    );
}