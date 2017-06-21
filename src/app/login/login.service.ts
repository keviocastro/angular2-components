import { Injectable, EventEmitter } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Router } from '@angular/router';
import 'rxjs/Rx';
import Auth0Lock from 'auth0-lock';
import { Http, Headers } from '@angular/http';

@Injectable()
export class AuthService {
    public lock: Auth0Lock;
    public spinnerShow = false;
    constructor(private router: Router, private http: Http) {
        this.lock = new Auth0Lock(environment.auth0.client_id, environment.auth0.domain, this.authOptions);
        Observable.fromEvent(this.lock, "authenticated").subscribe(result => this.authenticatedCB(result));
    }

    private async authenticatedCB(authResult) {
        this.lock.hide();
        this.spinnerShow = true;
        localStorage.setItem("access_token", authResult.accessToken);
        let profile = await this.getUserInfo(authResult.accessToken);
        let img = profile["https://daily-ui.logos.com/user_metadata"] && profile["https://daily-ui.logos.com/user_metadata"].picture;
        if (img) profile.picture = img;
        localStorage.setObject('userProfile', profile);
        await this.getOthersInfo();
        this.spinnerShow = false;
        this.redirectUser();
    }

    private async getOthersInfo() {
        return new Promise(async resolve => {
            let account_configs = (await this.getSchoolAPI('account-configs')).account_configs;
            let accountConfigs: any = {};
            account_configs.forEach(element => accountConfigs[element.name] = { value: element.value, default: element.default });
            let user = (await this.getSchoolAPI('auth/user')).person;
            let planId = accountConfigs.lesson_plan_model_id.value != "" ? accountConfigs.lesson_plan_model_id.value : accountConfigs.lesson_plan_model_id.default;
            let lessonPlan = (await this.getSchoolAPI(`lesson-plan-models/${planId}`)).lesson_plan_model;
            localStorage.setObject('userData', { "accountConfigurations": accountConfigs, "person": user, "lessonPlanModel": lessonPlan });
            resolve();
        })
    }

    async getSchoolAPI(url) {
        return this.http.get(`http://schools-dev.logoseducacao.com.br/api/${url}`,
            { headers: new Headers({ 'authorization': `Bearer ${localStorage.getItem('access_token')}` }) })
            .map(x => x.json()).toPromise<any>();
    }

    async getUserInfo(token) {
        return new Promise<any>((resolve, reject) => {
            this.lock.getUserInfo(token, (err, profile) => {
                if (err) reject(err);
                else resolve(profile);
            })
        })
    }

    private redirectUser() {
        let userData = localStorage.getObject('userData');
        let targetUrl = localStorage.getItem('targetUrl')
        let url = targetUrl ? targetUrl : "/class-daily";
        localStorage.removeItem('targetUrl');
        if (userData && userData.person) {
            this.router.navigateByUrl(url);
        } else {
            this.router.navigate(['/error']);
        }
    }

    private authOptions = {
        oidcConformant: true,
        closable: false,
        language: "pt-br",
        container: "auth-lock",
        rememberLastLogin: false,
        allowSignUp: false,
        theme: {
            logo: environment.auth0.logo_uri,
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
            redirectUrl: environment.host,
            params: {
                audience: environment.auth0.audience,
                scope: 'openid profile email'
            },
            responseType: "token"
        }
    }
}

export const environment = {
    production: false,
    host: "http://localhost:4200/auth",
    schools_api_uri: "http://schools-dev.logoseducacao.com.br/",
    auth0: {
        client_id: "XxjI1CTNTGYN9tbBx0yJmtMvvTbt5hWW",
        domain: "logos.auth0.com",
        logo_uri: "./assets/img/logos-azul.png",
        redirect_uri: "http://localhost:4200/auth",
        audience: 'api.schools'
    }
};