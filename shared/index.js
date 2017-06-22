import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthComponent } from './auth.component';
import { AuthService } from './auth.service';
import { MdlModule } from '@angular-mdl/core';
export * from './auth.component';
export * from './auth.service';
var LogosAuthModule = (function () {
    function LogosAuthModule() {
    }
    return LogosAuthModule;
}());
export { LogosAuthModule };
LogosAuthModule.decorators = [
    { type: NgModule, args: [{
                imports: [CommonModule, MdlModule],
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
LogosAuthModule.ctorParameters = function () { return []; };
//# sourceMappingURL=index.js.map