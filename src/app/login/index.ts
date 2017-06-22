import { NgModule, ModuleWithProviders } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthComponent } from './auth.component';
import { AuthService } from './auth.service';
import { MdlModule } from '@angular-mdl/core';

export * from './auth.component';
export * from './auth.service';

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
export class LogosAuthModule { }