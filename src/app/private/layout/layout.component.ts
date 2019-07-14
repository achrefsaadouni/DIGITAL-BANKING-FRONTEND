import { Component, OnInit } from '@angular/core';
import {NgxSpinnerService} from 'ngx-spinner';
import {AuthService} from '../../public/shared/auth.service';
@Component({
  selector: 'app-layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.css']
})
export class LayoutComponent implements OnInit {
  constructor(private service: AuthService, private spinner: NgxSpinnerService) {
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
