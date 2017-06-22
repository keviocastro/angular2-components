import { OnInit, EventEmitter } from '@angular/core';
import { AuthService } from './auth.service';
export declare class AuthComponent implements OnInit {
    auth: AuthService;
    constructor(auth: AuthService);
    authEnv: any;
    onThen: EventEmitter<any>;
    ngOnInit(): void;
}
