import {Component, OnInit, ViewChild} from '@angular/core';
import {MatPaginator} from '@angular/material/paginator';
import {MatSort} from '@angular/material/sort';
import {MatTableDataSource} from '@angular/material/table';
import {UserService} from '../services/user.service';
import {User} from '../../public/shared/models/User';
import {NgxSpinnerService} from 'ngx-spinner';


@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent implements OnInit {

  displayedColumns: string[] = ['email', 'firstName', 'lastName', 'createdDate'];
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
}

