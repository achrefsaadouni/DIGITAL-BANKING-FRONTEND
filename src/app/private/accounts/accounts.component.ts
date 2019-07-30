import {Component, OnInit, ViewChild} from '@angular/core';
import {MatPaginator, MatSnackBar, MatSort, MatTableDataSource} from '@angular/material';
import {NgxSpinnerService} from 'ngx-spinner';
import {Compte} from '../../public/shared/models/Compte';
import {AccountService} from '../services/account.service';
import {SharedService} from '../services/shared.service';
import Swal from "sweetalert2";
import {Router} from '@angular/router';

@Component({
  selector: 'app-accounts',
  templateUrl: './accounts.component.html',
  styleUrls: ['./accounts.component.css']
})
export class AccountsComponent implements OnInit {
  displayedColumns: string[] = ['type_compte', 'nom', 'prenom', 'email', 'revenu_net_mensuel', 'etat', 'action'];
  dataSource: MatTableDataSource<Compte>;

  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;
  @ViewChild(MatSort, {static: true}) sort: MatSort;

  private comptes: Compte[];
  private loading: boolean;

  constructor(private service: AccountService, private spinner: NgxSpinnerService,
              private snackBar: MatSnackBar, private sharedService: SharedService, private route: Router) {
    this.sharedService.breadcrumb = ['Dashboard', 'Compte'];
    this.loading = true;
    this.spinner.show('sp1');
    this.service.gelAll().subscribe(data => {
      this.comptes = data;
      if (this.comptes) {
        this.loading = false;
        this.spinner.hide('sp1');
        this.dataSource = new MatTableDataSource(this.comptes);
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
      }
    }, err => {
      this.spinner.hide('sp1');
      if (err.status === 404) {
        this.snackBar.open('la page que vous tentiez d\'atteindre sur un site Web est introuvable sur le serveur ', 'ok', {
          duration: 5000,
        });
      }
      if (err.status === 500) {
        this.snackBar.open('le serveur peut étre indisponible pour le moment', 'ok', {
          duration: 5000,
        });
      }
    });
  }

  ngOnInit() {
  }

  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  data(row: Compte) {
    this.service.markedAccount = row;
  }

  couleur(row: Compte) {
    if (row.etat_du_compte === 'pending') {
      return 'blue';
    } else if (row.etat_du_compte === 'accepted') {
      return 'green';
    }
    return 'red';
  }

  valider(compte: Compte) {
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
        this.service.traiter(compte.id, 'accepted').subscribe();
        Swal.fire({
          type: 'success',
          title: 'Compte Accepté',
          showConfirmButton: false,
          timer: 2000,
        }).then(() => {
          const index: number = this.comptes.findIndex(d => d === compte);
          this.comptes[index].etat_du_compte = 'accepted';
          this.dataSource = new MatTableDataSource(this.comptes);
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

  refuser(compte: Compte) {
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
        this.service.traiter(compte.id, 'refused').subscribe();
        Swal.fire({
          type: 'success',
          title: 'Demande refusé',
          showConfirmButton: false,
          timer: 2000,
        }).then(() => {
          const index: number = this.comptes.findIndex(d => d === compte);
          this.comptes[index].etat_du_compte = 'refused';
          this.dataSource = new MatTableDataSource(this.comptes);
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
