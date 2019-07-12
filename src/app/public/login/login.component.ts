import { Component, OnInit } from '@angular/core';
import {AuthService} from '../shared/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  login: string;
  password: string;
  constructor(private service: AuthService) { }

  ngOnInit() {
  }
  loginIn() {
    this.service.authenticateMe(this.login, this.password).subscribe(data => {
          this.service.setUser(data);
          console.log(this.service.getUser());
      }, err => {
         console.log(err);
      }
    );
  }

}
