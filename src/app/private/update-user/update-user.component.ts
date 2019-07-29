import { Component, OnInit } from '@angular/core';
import {UserService} from '../services/user.service';
import {User} from '../../public/shared/models/User';
import {Router} from '@angular/router';
import {SharedService} from '../services/shared.service';

@Component({
  selector: 'app-update-user',
  templateUrl: './update-user.component.html',
  styleUrls: ['./update-user.component.css']
})
export class UpdateUserComponent implements OnInit {
  userUpdate: User;
  constructor(private service: UserService , private route: Router, private sharedService: SharedService) {
    this.sharedService.breadcrumb = ['Dashboard' , 'Utilisateur' , 'Modifier'];
    if (this.service.markerUser) {
      this.userUpdate = this.service.markerUser;
    } else {
      this.route.navigate(['/admin/users']);
    }
  }

  ngOnInit() {
  }

}
