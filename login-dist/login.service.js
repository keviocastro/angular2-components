var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = y[op[0] & 2 ? "return" : op[0] ? "throw" : "next"]) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [0, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Router } from '@angular/router';
import 'rxjs/Rx';
import Auth0Lock from 'auth0-lock';
import { Http, Headers } from '@angular/http';
var AuthService = (function () {
    function AuthService(router, http) {
        var _this = this;
        this.router = router;
        this.http = http;
        this.spinnerShow = false;
        this.authOptions = {
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
        };
        this.lock = new Auth0Lock(environment.auth0.client_id, environment.auth0.domain, this.authOptions);
        Observable.fromEvent(this.lock, "authenticated").subscribe(function (result) { return _this.authenticatedCB(result); });
    }
    AuthService.prototype.authenticatedCB = function (authResult) {
        return __awaiter(this, void 0, void 0, function () {
            var profile, img;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        this.lock.hide();
                        this.spinnerShow = true;
                        localStorage.setItem("access_token", authResult.accessToken);
                        return [4 /*yield*/, this.getUserInfo(authResult.accessToken)];
                    case 1:
                        profile = _a.sent();
                        img = profile["https://daily-ui.logos.com/user_metadata"] && profile["https://daily-ui.logos.com/user_metadata"].picture;
                        if (img)
                            profile.picture = img;
                        localStorage.setObject('userProfile', profile);
                        return [4 /*yield*/, this.getOthersInfo()];
                    case 2:
                        _a.sent();
                        this.spinnerShow = false;
                        this.redirectUser();
                        return [2 /*return*/];
                }
            });
        });
    };
    AuthService.prototype.getOthersInfo = function () {
        return __awaiter(this, void 0, void 0, function () {
            var _this = this;
            return __generator(this, function (_a) {
                return [2 /*return*/, new Promise(function (resolve) { return __awaiter(_this, void 0, void 0, function () {
                        var account_configs, accountConfigs, user, planId, lessonPlan;
                        return __generator(this, function (_a) {
                            switch (_a.label) {
                                case 0: return [4 /*yield*/, this.getSchoolAPI('account-configs')];
                                case 1:
                                    account_configs = (_a.sent()).account_configs;
                                    accountConfigs = {};
                                    account_configs.forEach(function (element) { return accountConfigs[element.name] = { value: element.value, default: element.default }; });
                                    return [4 /*yield*/, this.getSchoolAPI('auth/user')];
                                case 2:
                                    user = (_a.sent()).person;
                                    planId = accountConfigs.lesson_plan_model_id.value != "" ? accountConfigs.lesson_plan_model_id.value : accountConfigs.lesson_plan_model_id.default;
                                    return [4 /*yield*/, this.getSchoolAPI("lesson-plan-models/" + planId)];
                                case 3:
                                    lessonPlan = (_a.sent()).lesson_plan_model;
                                    localStorage.setObject('userData', { "accountConfigurations": accountConfigs, "person": user, "lessonPlanModel": lessonPlan });
                                    resolve();
                                    return [2 /*return*/];
                            }
                        });
                    }); })];
            });
        });
    };
    AuthService.prototype.getSchoolAPI = function (url) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2 /*return*/, this.http.get("http://schools-dev.logoseducacao.com.br/api/" + url, { headers: new Headers({ 'authorization': "Bearer " + localStorage.getItem('access_token') }) })
                        .map(function (x) { return x.json(); }).toPromise()];
            });
        });
    };
    AuthService.prototype.getUserInfo = function (token) {
        return __awaiter(this, void 0, void 0, function () {
            var _this = this;
            return __generator(this, function (_a) {
                return [2 /*return*/, new Promise(function (resolve, reject) {
                        _this.lock.getUserInfo(token, function (err, profile) {
                            if (err)
                                reject(err);
                            else
                                resolve(profile);
                        });
                    })];
            });
        });
    };
    AuthService.prototype.redirectUser = function () {
        var userData = localStorage.getObject('userData');
        var targetUrl = localStorage.getItem('targetUrl');
        var url = targetUrl ? targetUrl : "/class-daily";
        localStorage.removeItem('targetUrl');
        if (userData && userData.person) {
            this.router.navigateByUrl(url);
        }
        else {
            this.router.navigate(['/error']);
        }
    };
    return AuthService;
}());
export { AuthService };
AuthService.decorators = [
    { type: Injectable },
];
/** @nocollapse */
AuthService.ctorParameters = function () { return [
    { type: Router, },
    { type: Http, },
]; };
export var environment = {
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
//# sourceMappingURL=login.service.js.map