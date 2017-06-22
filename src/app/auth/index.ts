import { NgModule, ModuleWithProviders } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthComponent } from './auth.component';
import { AuthService } from './auth.service';

export * from './auth.component';
export * from './auth.service';

@NgModule({
    imports: [CommonModule],
    exports: [AuthComponent],
    declarations: [
        AuthComponent
    ],
    entryComponents: [
        AuthComponent
    ], providers: [AuthService]
})
export class LogosAuthModule { }