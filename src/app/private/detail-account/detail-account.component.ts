import { Component, OnInit } from '@angular/core';
import {SharedService} from '../services/shared.service';

@Component({
  selector: 'app-detail-account',
  templateUrl: './detail-account.component.html',
  styleUrls: ['./detail-account.component.css']
})
export class DetailAccountComponent implements OnInit {
  step = 0;

  setStep(index: number) {
    this.step = index;
  }

  nextStep() {
    this.step++;
  }

  prevStep() {
    this.step--;
  }
  constructor(private sharedService: SharedService) {
    this.sharedService.breadcrumb = ['Dashboard' , 'Compte' , 'Detail'];
  }

  ngOnInit() {
  }

}
