import { Router } from '@angular/router';
import 'rxjs/Rx';
import Auth0Lock from 'auth0-lock';
import { Http } from '@angular/http';
export declare class AuthService {
    private router;
    private http;
    lock: Auth0Lock;
    spinnerShow: boolean;
    constructor(router: Router, http: Http);
    private authenticatedCB(authResult);
    private getOthersInfo();
    getSchoolAPI(url: any): Promise<any>;
    getUserInfo(token: any): Promise<any>;
    private redirectUser();
    private authOptions;
}
export declare const environment: {
    production: boolean;
    host: string;
    schools_api_uri: string;
    auth0: {
        client_id: string;
        domain: string;
        logo_uri: string;
        redirect_uri: string;
        audience: string;
    };
};
