import { Component, OnInit } from '@angular/core';
import {AuthService} from '../shared/auth.service';
import {User} from '../shared/models/User';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  nom: string;
  prenom: string;
  username: string;
  password: string;
  repassword: string;
  user = new User();
  constructor(private service: AuthService) {
  }
  ngOnInit() {
  }

  register() {
    this.user.lastName = this.nom;
    this.user.firstName = this.prenom;
    this.user.createdDate = new Date();
    this.user.email = this.username;
    this.user.password = this.password;
    this.service.registerMe(this.user).subscribe(data => {
      console.log(data);
      }, err => {
        console.log(err);
      }
    );
  }
}
