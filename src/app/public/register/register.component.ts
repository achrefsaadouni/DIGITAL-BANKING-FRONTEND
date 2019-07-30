import {Component, OnInit} from '@angular/core';
import {AuthService} from '../shared/auth.service';
import {User} from '../shared/models/User';
import {Router} from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  nom = '';
  prenom = '';
  username = '';
  password = '';
  repassword = '';
  user = new User();
  erreur = '';
  erreurR = '';

  constructor(private service: AuthService, private route: Router) {
  }

  ngOnInit() {
  }

  register() {
    if (this.password !== this.repassword) {
      this.erreur = 'Les mots de passe ne sont pas identiques';
    } else if (this.nom === '' || this.prenom === '' || this.username === '' || this.password === '' || this.repassword === '') {
      this.erreurR = 'Champ Obligatoire';
    } else {
      this.user.lastName = this.nom;
      this.user.firstName = this.prenom;
      this.user.createdDate = new Date();
      this.user.email = this.username;
      this.user.password = this.password;
      Swal.fire(
        'Confirmation',
        'Vous Devez Activez vore compte a partir de votre adresse Email',
        'info'
      ).then((r) => {
        this.route.navigate(['login']);
      });
      this.service.registerMe(this.user).subscribe(data => {
        }, err => {
          console.log(err);
        }
      );
    }
    setTimeout(() => {
      this.erreur = '';
      this.erreurR = '';
    } , 3000);
  }
}
