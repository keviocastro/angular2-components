import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthComponent } from './auth.component';
import { AuthService } from './auth.service';
export * from './auth.component';
export * from './auth.service';
var Auth0Module = (function () {
    function Auth0Module() {
    }
    return Auth0Module;
}());
export { Auth0Module };
Auth0Module.decorators = [
    { type: NgModule, args: [{
                imports: [CommonModule],
                exports: [AuthComponent],
                declarations: [
                    AuthComponent
                ],
                entryComponents: [
                    AuthComponent
                ], providers: [AuthService]
            },] },
];
/** @nocollapse */
Auth0Module.ctorParameters = function () { return []; };
//# sourceMappingURL=index.js.map