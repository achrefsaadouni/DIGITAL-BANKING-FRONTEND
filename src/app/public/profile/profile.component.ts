import {Component, OnInit} from '@angular/core';
import {AuthService} from '../shared/auth.service';
import Swal from 'sweetalert2';
import {User} from '../shared/models/User';
import {UserService} from '../services/user.service';
import {MatSnackBar} from '@angular/material';
import {Router} from '@angular/router';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  userUpdate: User;
  firstName: string;
  lastName: string;
  private update = false;
  ancienPassword = '';
  newPassword = '';
  newPasswordRe = '';
  private erreur = '';
  private erreurR: string;

  constructor(private authService: AuthService, private service: UserService, private snackBar: MatSnackBar, private route: Router) {
    this.userUpdate = this.authService.getUser();
    this.firstName = this.userUpdate.firstName;
    this.lastName = this.userUpdate.lastName;
  }

  ngOnInit() {
  }

  updateUser() {
    if (this.userUpdate.firstName !== this.firstName && this.firstName !== '' && this.firstName !== null) {
      this.userUpdate.firstName = this.firstName;
      this.update = true;
    }
    if (this.userUpdate.lastName !== this.lastName && this.lastName !== '' && this.lastName !== null) {
      this.userUpdate.lastName = this.lastName;
      this.update = true;
    }
    if (this.update) {
      this.update = false;
      // @ts-ignore
      this.service.updateProfile(this.userUpdate._id, this.userUpdate).subscribe();
      Swal.fire({
        type: 'success',
        title: 'Profil modifié',
        showConfirmButton: false,
        timer: 2000
      }).then(result => {
      });
    }
  }

  updatePassword() {
    if (this.newPassword !== this.newPasswordRe) {
      this.erreur = 'Les mots de passe ne sont pas identiques';
    } else if (this.newPassword === '' || this.newPasswordRe === '' || this.ancienPassword === '') {
      this.erreurR = 'Ce champ est obligatoire';
    } else {
      this.service.updatePassword(this.userUpdate._id, this.ancienPassword, this.newPassword).subscribe(next => {
      }, err => {
        if (err.status === 406) {
          this.snackBar.open('Votre ancien mot de passe est incorrect', 'ok', {
            duration: 2000,
          });
        }
      }, () => {
        Swal.fire({
          type: 'success',
          title: 'Mot de passe modifié',
          showConfirmButton: false,
          timer: 2000
        }).then(result => {
          this.authService.setUser(null);
          this.route.navigate(['/login']);
        });
      });
    }
    setTimeout(() => {
      this.erreur = '';
      this.erreurR = '';
    }, 3000);
  }
}
