import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthComponent } from './login.component';
import { AuthService } from './login.service';
import { MdlModule } from '@angular-mdl/core';
export * from './login.component';
export * from './login.service';
var LogosLoginModule = (function () {
    function LogosLoginModule() {
    }
    return LogosLoginModule;
}());
export { LogosLoginModule };
LogosLoginModule.decorators = [
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
LogosLoginModule.ctorParameters = function () { return []; };
//# sourceMappingURL=index.js.map