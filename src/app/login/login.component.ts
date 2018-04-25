import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { routerTransition } from '../router.animations';
import {MatPaginator, MatTableDataSource, MatDialog} from '@angular/material';
import { Headers, Http} from '@angular/http';
import 'rxjs/add/operator/map';
import { AddCicDialogComponent } from '../components/add-cic-dialog/add-cic-dialog.component';
import { FormControl } from '@angular/forms';

@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.scss'],
    animations: [routerTransition()]
})
export class LoginComponent implements OnInit {
  displayedColumns = ['cicId', 'cicType', 'subject', 'body', 'sourceSystem', 'cicTimestamp'];
  dataSource = new MatTableDataSource<Cic>([]);
  ELEMENT_DATA: Cic[] = [];
  ID = new FormControl();
  isLoading = false;

  @ViewChild(MatPaginator) paginator: MatPaginator;

  /**
   * Set the paginator after the view init since this component will
   * be able to query its view for the initialized paginator.
   */
  constructor(public router: Router, private http: Http, private dialog: MatDialog) {}
    ngOnInit() {
        this.getData();
    }
    // tslint:disable-next-line:use-life-cycle-interface
    ngAfterViewInit() {
        this.dataSource.paginator = this.paginator;
    }
    addCic() {
        const dialogRef = this.dialog.open(AddCicDialogComponent, {});
        dialogRef.afterClosed().subscribe((result) => {
            this.getData();
        });
    }
    getData() {
        const vm = this;
        this.http.get('http://localhost:8080/cic-all')
        .map((response) => response.json())
        .subscribe((res) => {
          vm.dataSource.data = res;
          vm.paginator.length = res.length;
        });
    }
    getDataById() {
        const vm = this;
        vm.isLoading = true;
        this.http.get('http://localhost:8080/cic/' + vm.ID.value)
        .map((response) => response.json())
        .subscribe((res) => {
            const ll = [];
            ll.push(res);
          vm.dataSource.data = ll;
          vm.paginator.length = ll.length;
          vm.isLoading = false;
        });
    }
}

export interface Cic {
    cicId: number;
    cicType: string;
    subject: string;
    body: string;
    sourceSystem: string;
    cicTimestamp: Date;
}
export interface Email {
    emailId: number;
    emailName: string;
    emailAddress: string;
}

const ELEMENT_DATA: Cic[] = [];
