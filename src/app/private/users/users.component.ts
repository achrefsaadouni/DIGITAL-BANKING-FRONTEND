import {Component, OnInit, ViewChild} from '@angular/core';
import {MatPaginator} from '@angular/material/paginator';
import {MatSort} from '@angular/material/sort';
import {MatTableDataSource} from '@angular/material/table';
import {UserService} from '../services/user.service';
import {User} from '../../public/shared/models/User';
import {NgxSpinnerService} from 'ngx-spinner';

import Swal from 'sweetalert2';


@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent implements OnInit {

  displayedColumns: string[] = ['email', 'firstName', 'lastName', 'createdDate', 'enabled', 'action'];
  dataSource: MatTableDataSource<User>;

  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;
  @ViewChild(MatSort, {static: true}) sort: MatSort;
  private users: User[];
  private loading: boolean;

  constructor(private service: UserService, private spinner: NgxSpinnerService) {
    this.loading = true;
    this.spinner.show('sp1');
    this.service.gelAll().subscribe(data => {
      this.users = data;
      if (this.users) {
        this.loading = false;
        this.spinner.hide('sp1');
        this.dataSource = new MatTableDataSource(this.users);
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
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

  data(user: User) {
    this.service.markerUser = user;
  }

  ban(row: User) {
    Swal.fire({
      title: 'Êtes-vous sûr?',
      text: 'Vous allez le bannir!',
      type: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Oui, ban-le!',
      cancelButtonText: 'Non, garde le'
    }).then((result) => {
      if (result.value) {
        // @ts-ignore
        this.service.ban(row.id).subscribe();
        Swal.fire({
          type: 'success',
          title: 'Utilisateur banni',
          showConfirmButton: false,
          timer: 2000,
        }).then(() => {
          const index: number = this.users.findIndex(d => d === row);
          this.users[index].enabled = false;
          this.dataSource = new MatTableDataSource(this.users);
        });

      } else if (result.dismiss === Swal.DismissReason.cancel) {
        Swal.fire(
          'Annulé',
          'utilisateur non modifier :)',
          'error'
        );
      }
    });
  }

  restorer(row: User) {
    Swal.fire({
      title: 'Êtes-vous sûr?',
      text: 'Vous allez le restorer!',
      type: 'info',
      showCancelButton: true,
      confirmButtonText: 'Oui, restore-le!',
      cancelButtonText: 'Non, garde le'
    }).then((result) => {
      if (result.value) {
        // @ts-ignore
        this.service.restorer(row.id).subscribe();
        Swal.fire({
          type: 'success',
          title: 'Utilisateur restoré',
          showConfirmButton: false,
          timer: 2000,
        }).then(() => {
          const index: number = this.users.findIndex(d => d === row);
          this.users[index].enabled = true;
          this.dataSource = new MatTableDataSource(this.users);
        });

      } else if (result.dismiss === Swal.DismissReason.cancel) {
        Swal.fire(
          'Annulé',
          'utilisateur non modifier :)',
          'error'
        );
      }
    });
  }


}

