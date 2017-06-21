import { Component, OnInit } from '@angular/core';
import { AuthService } from './login.service';

@Component({
  selector: 'login-auth',
  templateUrl: 'login.component.html',
  styleUrls: ['login.component.scss']
})
export class AuthComponent implements OnInit {
  constructor(public auth: AuthService) { }


  ngOnInit() {
    this.auth.lock.show();
  }
}
