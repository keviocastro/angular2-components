import { EventEmitter } from '@angular/core';
import 'rxjs/Rx';
import Auth0Lock from 'auth0-lock';
export declare class AuthService {
    lock: Auth0Lock;
    onThen: EventEmitter<any>;
    create(authEnv: any): void;
    private authenticatedCB(authResult);
    private getUserInfo(token);
    private authOptions(env);
}
