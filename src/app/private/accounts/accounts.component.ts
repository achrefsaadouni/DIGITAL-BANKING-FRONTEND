import {Component, OnInit, ViewChild} from '@angular/core';
import {MatPaginator, MatSnackBar, MatSort, MatTableDataSource} from '@angular/material';
import {NgxSpinnerService} from 'ngx-spinner';
import {Compte} from '../../public/shared/models/Compte';
import {AccountService} from '../services/account.service';

@Component({
  selector: 'app-accounts',
  templateUrl: './accounts.component.html',
  styleUrls: ['./accounts.component.css']
})
export class AccountsComponent implements OnInit {
  displayedColumns: string[] = ['nom', 'prenom', 'email', 'revenu_net_mensuel', 'type_compte' , 'etat' , 'action'];
  dataSource: MatTableDataSource<Compte>;

  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;
  @ViewChild(MatSort, {static: true}) sort: MatSort;

  private comptes: Compte[];
  private loading: boolean;

  constructor(private service: AccountService, private spinner: NgxSpinnerService, private snackBar: MatSnackBar) {
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
}
