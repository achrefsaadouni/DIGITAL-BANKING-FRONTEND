import {Component, OnInit} from '@angular/core';
import {AuthService} from '../shared/auth.service';
import {NgxSpinnerService} from 'ngx-spinner';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  images = [
    'https://picsum.photos/id/114/1580/600',
    'https://picsum.photos/id/113/1580/600',
    'https://picsum.photos/id/112/1580/600'
  ];

  constructor() {
  }

  ngOnInit() {
  }

}
