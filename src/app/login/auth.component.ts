import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { AuthService } from './auth.service';

@Component({
  selector: 'logos-auth',
  templateUrl: 'auth.component.html'
})
export class AuthComponent implements OnInit {
  constructor(public auth: AuthService) { }
  @Input() authEnv: any;
  @Output() onThen = new EventEmitter<any>();

  ngOnInit() {
    this.auth.create(this.authEnv);
    this.auth.lock.show();
    this.auth.onThen.subscribe(() => this.onThen.emit());
  }
}
