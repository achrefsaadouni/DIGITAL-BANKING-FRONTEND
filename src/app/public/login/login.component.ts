import {Component, OnInit} from '@angular/core';
import {AuthService} from '../shared/auth.service';
import {Router} from '@angular/router';
import {NgxSpinnerService} from 'ngx-spinner';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  login: string;
  password: string;

  constructor(private service: AuthService, private route: Router, private spinner: NgxSpinnerService) {
  }

  ngOnInit() {
  }

  loginIn() {
    this.spinner.show();
    this.service.authenticateMe(this.login, this.password).subscribe(data => {
        this.service.setUser(data);
        if (this.service.getUser() && this.service.getUser().roles[0].role === 'ADMIN') {
          this.spinner.hide();
          this.route.navigate(['admin/dashboard']);
        }
        if (this.service.getUser() && this.service.getUser().roles[0].role === 'USER') {
          this.spinner.hide();
          this.route.navigate(['home']);
        }
      }, err => {
        console.log(err);
      }
    );
  }

}
