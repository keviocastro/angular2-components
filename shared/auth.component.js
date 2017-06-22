import { Component, Input, Output, EventEmitter } from '@angular/core';
import { AuthService } from './auth.service';
var AuthComponent = (function () {
    function AuthComponent(auth) {
        this.auth = auth;
        this.onThen = new EventEmitter();
    }
    AuthComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.auth.create(this.authEnv);
        this.auth.lock.show();
        this.auth.onThen.subscribe(function () { return _this.onThen.emit(); });
    };
    return AuthComponent;
}());
export { AuthComponent };
AuthComponent.decorators = [
    { type: Component, args: [{
                selector: 'logos-auth',
                template: "<div id=\"auth-lock\"></div>"
            },] },
];
/** @nocollapse */
AuthComponent.ctorParameters = function () { return [
    { type: AuthService, },
]; };
AuthComponent.propDecorators = {
    'authEnv': [{ type: Input },],
    'onThen': [{ type: Output },],
};
//# sourceMappingURL=auth.component.js.map