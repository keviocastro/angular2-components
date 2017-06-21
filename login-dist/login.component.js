import { Component } from '@angular/core';
import { AuthService } from './login.service';
var AuthComponent = (function () {
    function AuthComponent(auth) {
        this.auth = auth;
    }
    AuthComponent.prototype.ngOnInit = function () {
        this.auth.lock.show();
    };
    return AuthComponent;
}());
export { AuthComponent };
AuthComponent.decorators = [
    { type: Component, args: [{
                selector: 'login-auth',
                template: "<div class=\"container-flex\"><div class=\"header-bg\"></div><div class=\"form-auth\" id=\"auth-lock\"></div><div class=\"body-bg\"><div class=\"bg-left\"></div><div class=\"bg-center\"><div class=\"loader-container\" *ngIf=\"auth.spinnerShow\"><mdl-spinner single-color active></mdl-spinner></div></div><div class=\"bg-right\"></div></div><footer class=\"align-botton\"><img alt=\"Logos Educa\u00E7ao\" title=\"Logos Educa\u00E7\u00E3o\" src=\"assets/img/logos-azul.png\"> <span class=\"copyright\">Copyright \u00A9 2016 \u2022 L\u00F3gos Educa\u00E7\u00E3o - Vers\u00E3o 2.0</span></footer></div>",
                styles: [".container-flex{display:-webkit-box;display:-ms-flexbox;display:flex;-webkit-box-orient:vertical;-webkit-box-direction:normal;-ms-flex-direction:column;flex-direction:column;min-height:100vh}.header-bg{display:inline-block;background-color:var(--main-color-dark);width:100%;height:270px;border-bottom:20px solid var(--tangerine)}.body-bg,.body-bg .bg-center,.body-bg .bg-center .loader-container{display:-webkit-box;display:-ms-flexbox;display:flex;-webkit-box-pack:center;-ms-flex-pack:center;justify-content:center}.body-bg{width:100%;overflow-x:hidden}.body-bg .bg-left{background-image:url(/assets/img/bg_left.svg);background-repeat:repeat-x;background-size:251px;height:300px;background-position-x:right;background-position-y:-10px;min-width:360px}.body-bg .bg-center,.body-bg .bg-center .loader-container{-webkit-box-align:center;-ms-flex-align:center;align-items:center}.body-bg .bg-center{background-image:url(/assets/img/bg_center.svg);background-repeat:no-repeat;background-position-x:center;background-position-y:-10px;background-size:1291px;min-width:1291px;height:calc(100vh - 370px);min-height:300px}.body-bg .bg-center .loader-container{width:300px;position:absolute;top:160px;background-color:#fff;border-radius:5px;height:200px}.body-bg .bg-right{background-image:url(/assets/img/bg_right.svg);background-repeat:repeat-x;background-position-x:left;background-position-y:-10px;background-size:279px;height:300px;min-width:360px;position:relative;left:-15px}footer{margin:40px 0 20px 55px;color:#4a4a4a;font-size:12px;font-weight:300}footer img{width:70px;height:17px}footer .copyright{padding-left:15px}@media (max-width:479px){footer{margin:20px auto;padding:0 20px}}#auth-lock{margin:0 auto;top:100px;margin-left:calc(50% - 150px);position:absolute;-webkit-box-flex:1;-ms-flex:1;flex:1}@media (max-width:479px){#auth-lock{top:60px}}:host /deep/ .auth0-lock-input{margin:0!important;border-bottom:none!important}:host /deep/ .auth0-lock.auth0-lock .auth0-lock-header{height:auto!important}:host /deep/ .auth0-lock.auth0-lock{font-family:'Roboto',sans-serif}:host /deep/ input[type=password]:focus:not([readonly]),:host /deep/ input[type=text]:focus:not([readonly]){border-bottom:none!important;-webkit-box-shadow:none!important;box-shadow:none!important}:host /deep/ .auth0-lock.auth0-lock .auth0-lock-header-logo{height:100%!important;width:150px}:host /deep/ .auth0-lock.auth0-lock .auth0-lock-header-bg{height:auto!important}:host /deep/ .auth0-lock.auth0-lock .auth0-global-message.auth0-global-message-success{background-color:#ff9800}"]
            },] },
];
/** @nocollapse */
AuthComponent.ctorParameters = function () { return [
    { type: AuthService, },
]; };
//# sourceMappingURL=login.component.js.map