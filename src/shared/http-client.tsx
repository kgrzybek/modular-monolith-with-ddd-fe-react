import { ApplicationSettings } from "../configuration/application-settings";
import { AuthenticationService } from "../login/authentication/authentication-service";

export class HttpClient {
    public static async post<TResult>(resource: string, body: string): Promise<TResult> {

        const headers = HttpClient.GetHeaders();
        var requestOptions: RequestInit = {
            method: 'POST',
            body: body,
            redirect: 'follow',
            headers: headers
        };

        var url = ApplicationSettings.API_URL + resource;

        const response = await fetch(url, requestOptions);
        if (response.status === 200) {
            return Promise.resolve(response as any);
        }
        else {
            return Promise.reject(new Error(response.statusText));
        }
    }

    public static async postForm<TResult>(resource: string, body: FormData): Promise<TResult> {

        const headers = HttpClient.GetHeaders(null);
        var requestOptions: RequestInit = {
            method: 'POST',
            body: body,
            redirect: 'follow',
            headers: headers
        };

        var url = ApplicationSettings.API_URL + resource;

        const response = await fetch(url, requestOptions);
        if (response.status === 200) {
            return Promise.resolve(response.json());
        }
        else {
            return Promise.reject(new Error(response.statusText));
        }
    }

    public static async patch<TResult>(resource: string, body: string | null): Promise<TResult> {
        const headers = HttpClient.GetHeaders();
        var requestOptions: RequestInit = {
            method: 'PATCH',
            body: body,
            redirect: 'follow',
            headers: headers
        };

        var url = ApplicationSettings.API_URL + resource;

        const response = await fetch(url, requestOptions);
        if (response.status === 200) {
            if (response.bodyUsed) {
                return Promise.resolve(response.json());
            }
            else {
                return response as any;
            }

        }
        else {
            return Promise.reject(new Error(response.statusText));
        }
    }



    public static async get<TResult>(resource: string): Promise<TResult> {
        const headers = HttpClient.GetHeaders();
        var requestOptions: RequestInit = {
            method: 'GET',
            redirect: 'follow',
            headers: headers
        };

        var url = ApplicationSettings.API_URL + resource;

        const response = await fetch(url, requestOptions);
        if (response.status === 200) {
            return Promise.resolve(response.json());
        }

        if (response.status === 204) {
            return Promise.resolve(response.json());
        }
        else {
            return Promise.reject(new Error(response.statusText));
        }
    }

    private static GetHeaders(contentType: null | string = 'application/json'): Record<string, string> {
        var token = AuthenticationService.getAccessToken();

        let headers: Record<string, string> = {};

        if (token != null) {
            headers['Authorization'] = 'Bearer ' + token;
        }

        if (contentType != null) {
            headers['Content-Type'] = contentType;
        }

        return headers;
    }
}