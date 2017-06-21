import { OnInit } from '@angular/core';
import { AuthService } from './login.service';
export declare class AuthComponent implements OnInit {
    auth: AuthService;
    constructor(auth: AuthService);
    ngOnInit(): void;
}
