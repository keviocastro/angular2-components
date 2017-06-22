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
import { Injectable, EventEmitter } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import 'rxjs/Rx';
import Auth0Lock from 'auth0-lock';
var AuthService = (function () {
    function AuthService() {
        this.onThen = new EventEmitter();
    }
    AuthService.prototype.create = function (authEnv) {
        var _this = this;
        this.lock = new Auth0Lock(authEnv.auth0.client_id, authEnv.auth0.domain, this.authOptions(authEnv));
        Observable.fromEvent(this.lock, "authenticated").subscribe(function (result) { return _this.authenticatedCB(result); });
    };
    AuthService.prototype.authenticatedCB = function (authResult) {
        return __awaiter(this, void 0, void 0, function () {
            var profile, img;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        this.lock.hide();
                        localStorage.setItem("access_token", authResult.accessToken);
                        return [4 /*yield*/, this.getUserInfo(authResult.accessToken)];
                    case 1:
                        profile = _a.sent();
                        img = profile["https://daily-ui.logos.com/user_metadata"] && profile["https://daily-ui.logos.com/user_metadata"].picture;
                        if (img)
                            profile.picture = img;
                        localStorage.setObject('userProfile', profile);
                        this.onThen.emit();
                        return [2 /*return*/];
                }
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
    AuthService.prototype.authOptions = function (env) {
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
                    scope: env.auth0.scope
                },
                responseType: "token"
            }
        };
    };
    return AuthService;
}());
export { AuthService };
AuthService.decorators = [
    { type: Injectable },
];
/** @nocollapse */
AuthService.ctorParameters = function () { return []; };
//# sourceMappingURL=auth.service.js.map