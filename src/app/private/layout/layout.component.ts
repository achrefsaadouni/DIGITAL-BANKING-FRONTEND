import {Component, OnInit} from '@angular/core';
import {NgxSpinnerService} from 'ngx-spinner';
import {AuthService} from '../../public/shared/auth.service';
import {User} from '../../public/shared/models/User';
import {SharedService} from '../services/shared.service';

@Component({
  selector: 'app-layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.css']
})
export class LayoutComponent implements OnInit {
  showFiller = false;
  user: User;

  constructor(private service: AuthService, private spinner: NgxSpinnerService, private sharedService: SharedService) {
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
