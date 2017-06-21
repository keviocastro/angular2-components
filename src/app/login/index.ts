import { NgModule, ModuleWithProviders } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthComponent } from './login.component';
import { AuthService } from './login.service';
import { MdlModule } from '@angular-mdl/core';

export * from './login.component';
export * from './login.service';

@NgModule({
    imports: [CommonModule, MdlModule],
    exports: [AuthComponent],
    declarations: [
        AuthComponent
    ],
    entryComponents: [
        AuthComponent
    ], providers: [AuthService]
})
export class LogosLoginModule { }