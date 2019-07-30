import {Component, OnInit} from '@angular/core';
import {UserService} from '../services/user.service';
import {User} from '../../public/shared/models/User';
import {Router} from '@angular/router';
import {SharedService} from '../services/shared.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-update-user',
  templateUrl: './update-user.component.html',
  styleUrls: ['./update-user.component.css']
})
export class UpdateUserComponent implements OnInit {
  userUpdate: User;
  firstName: string;
  lastName: string;
  role: string;
  private update = false;

  constructor(private service: UserService, private route: Router, private sharedService: SharedService) {
    this.sharedService.breadcrumb = ['Dashboard', 'Utilisateur', 'Modifier'];
    if (this.service.markerUser) {
      this.userUpdate = this.service.markerUser;
      this.firstName = this.userUpdate.firstName;
      this.lastName = this.userUpdate.lastName;
      this.role = this.userUpdate.roles[0].role;
    } else {
      this.route.navigate(['/admin/users']);
    }

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
    if (this.userUpdate.roles[0].role !== this.role && this.role !== '' && this.role !== null && this.role !== undefined) {
      // @ts-ignore
      this.service.updateRole(this.userUpdate.id, this.role).subscribe();
      Swal.fire({
        type: 'success',
        title: 'Utilisateur modifié',
        showConfirmButton: false,
        timer: 2000
      }).then(result => {
        this.route.navigate(['/admin/users']);
      });
    }
    if (this.update) {
      this.update = false;
      // @ts-ignore
      this.service.update(this.userUpdate.id, this.userUpdate).subscribe();
      Swal.fire({
        type: 'success',
        title: 'Utilisateur modifié',
        showConfirmButton: false,
        timer: 2000
      }).then(result => {
        this.route.navigate(['/admin/users']);
      });
    }
  }
}
