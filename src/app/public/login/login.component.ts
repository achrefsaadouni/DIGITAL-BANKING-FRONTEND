import {Component, OnInit} from '@angular/core';
import {AuthService} from '../shared/auth.service';
import {Router} from '@angular/router';
import {NgxSpinnerService} from 'ngx-spinner';
import {MatSnackBar} from '@angular/material';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  login: string;
  password: string;
  Error: boolean;
  constructor(private service: AuthService, private route: Router, private spinner: NgxSpinnerService, private snackBar: MatSnackBar) {
    this.Error = false;
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
        this.spinner.hide();
        if ( err.status === 401) {
          this.snackBar.open('Email / Mot de passe que vous avez entré n\'est pas valide', 'ok', {
            duration: 5000,
          });
        }
        if ( err.status === 500) {
        this.snackBar.open('le serveur peut étre indisponible pour le moment', 'ok', {
          duration: 5000,
        });
      }
      }
    );
  }

}
