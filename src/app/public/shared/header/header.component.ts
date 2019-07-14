import { Component, OnInit } from '@angular/core';
import {AuthService} from '../auth.service';
import {NgxSpinnerService} from 'ngx-spinner';
import {User} from '../models/User';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  user: User;
  constructor(private service: AuthService, private spinner: NgxSpinnerService) {
    this.user = this.service.getUser();
  }

  ngOnInit() {
  }
  logout() {
    this.spinner.show();
    setTimeout(() => {
      this.spinner.hide();
      this.service.logout();
    }, 2000);
  }
}
