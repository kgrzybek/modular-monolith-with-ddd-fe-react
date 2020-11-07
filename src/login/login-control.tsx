import React, { useState } from "react";
import {
    BrowserRouter as Router,
    useLocation,
    Link,
    useHistory
} from "react-router-dom";
import { HttpClient } from "../shared/http-client";
import { AuthenticationService } from "./authentication/authentication-service";
import { LoginForm } from "./login-form";
import { LogOutForm } from "./logout-form";

interface UserInfo {
    id: string
}

export function LoginControl() {
    const [isAuthenticated, setIsAuthenticated] = useState<boolean>(AuthenticationService.isAuthenticated());

    let history = useHistory();

    function onSuccessfulLoginEvent() {
        setIsAuthenticated(true);

        HttpClient.get<UserInfo>("api/userAccess/authenticatedUser")
        .then(data => {
            AuthenticationService.setUserId(data.id);
            document.location.href= '/';
        });
        
    }
    function onLogOffEvent() {
        setIsAuthenticated(false);
        document.location.href= '/';
    }

    if (isAuthenticated) {
        return <LogOutForm onLogOffEvent={onLogOffEvent} />
    }
    else {
        return (<div>
            <LoginForm
                onSuccessfulLoginEvent={onSuccessfulLoginEvent} /></div>)
    }
}