import {Component, OnInit} from '@angular/core';
import {SharedService} from '../services/shared.service';
import {AccountService} from '../services/account.service';
import {Compte} from '../../public/shared/models/Compte';
import {Router} from '@angular/router';
import Swal from 'sweetalert2';
import {MatTableDataSource} from '@angular/material';

@Component({
  selector: 'app-detail-account',
  templateUrl: './detail-account.component.html',
  styleUrls: ['./detail-account.component.css']
})
export class DetailAccountComponent implements OnInit {
  step;
  compte: Compte;

  setStep(index: number) {
    this.step = index;
  }

  nextStep() {
    this.step++;
  }

  prevStep() {
    this.step--;
  }

  constructor(private sharedService: SharedService, private service: AccountService, private route: Router) {
    this.sharedService.breadcrumb = ['Dashboard', 'Compte', 'Detail'];
    if (this.service.markedAccount) {
      this.compte = this.service.markedAccount;
    } else {
      this.route.navigate(['/admin/accounts']);
    }
  }

  ngOnInit() {
  }

  valider() {
    Swal.fire({
      title: 'Êtes-vous sûr?',
      text: 'Vous allez accepter cette demande!',
      type: 'info',
      showCancelButton: true,
      confirmButtonText: 'Oui, accepte-le!',
      cancelButtonText: 'Non, garde le'
    }).then((result) => {
      if (result.value) {
        // @ts-ignore
        this.service.traiter(this.service.markedAccount.id, 'accepted').subscribe();
        Swal.fire({
          type: 'success',
          title: 'Compte Accepté',
          showConfirmButton: false,
          timer: 2000,
        }).then(() => {
          this.route.navigate(['/admin/accounts']);
        });

      } else if (result.dismiss === Swal.DismissReason.cancel) {
        Swal.fire(
          'Annulé',
          'Demande non modifier :)',
          'error'
        );
      }
    });
  }

  refuser() {
    Swal.fire({
      title: 'Êtes-vous sûr?',
      text: 'Vous allez Refuser cette demande!',
      type: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Oui, refuse-le!',
      cancelButtonText: 'Non, garde le'
    }).then((result) => {
      if (result.value) {
        // @ts-ignore
        this.service.traiter(this.service.markedAccount.id, 'refused').subscribe();
        Swal.fire({
          type: 'success',
          title: 'Demande refusé',
          showConfirmButton: false,
          timer: 2000,
        }).then(() => {
          this.route.navigate(['/admin/accounts']);
        });

      } else if (result.dismiss === Swal.DismissReason.cancel) {
        Swal.fire(
          'Annulé',
          'Demande non modifier :)',
          'error'
        );
      }
    });
  }
}
