import { Injectable, EventEmitter } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import 'rxjs/Rx';
import Auth0Lock from 'auth0-lock';

@Injectable()
export class AuthService {
    public lock: Auth0Lock;
    public onThen = new EventEmitter<any>();

    create(authEnv) {
        this.lock = new Auth0Lock(authEnv.auth0.client_id, authEnv.auth0.domain, this.authOptions(authEnv));
        Observable.fromEvent(this.lock, "authenticated").subscribe(result => this.authenticatedCB(result));
    }

    private async authenticatedCB(authResult) {
        this.lock.hide();
        localStorage.setItem("access_token", authResult.accessToken);
        let profile = await this.getUserInfo(authResult.accessToken);
        let img = profile["https://daily-ui.logos.com/user_metadata"] && profile["https://daily-ui.logos.com/user_metadata"].picture;
        if (img) profile.picture = img;
        localStorage.setObject('userProfile', profile);
        this.onThen.emit();
    }

    private async getUserInfo(token) {
        return new Promise<any>((resolve, reject) => {
            this.lock.getUserInfo(token, (err, profile) => {
                if (err) reject(err);
                else resolve(profile);
            })
        })
    }

    private authOptions(env) {
        return {
            oidcConformant: true,
            closable: false,
            language: "pt-br",
            container: "auth-lock",
            rememberLastLogin: false,
            allowSignUp: false,
            theme: {
                logo: env.auth0.logo_uri,
                primaryColor: "#ff9800",
                foregroundColor: "#ff9800",
                title: ""
            },
            languageDictionary: {
                title: "",
                error: {
                    login: {
                        "invalid_grant": "Senha ou email incorretos"
                    }
                }
            },
            auth: {
                redirect: true,
                redirectUrl: env.host,
                params: {
                    audience: env.auth0.audience,
                    scope: 'openid profile email'
                },
                responseType: "token"
            }
        }
    }
}