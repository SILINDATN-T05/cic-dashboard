import { Component, OnInit, ViewContainerRef } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import {MatDialogRef} from '@angular/material';
import { Router } from '@angular/router';
import * as _ from 'lodash';
import { Toast, ToastsManager } from 'ng2-toastr/ng2-toastr';
import { Http } from '@angular/http';
import { Cic } from '../../login/login.component';

@Component({
  selector: 'app-add-cic-dialog',
  templateUrl: './add-cic-dialog.component.html',
  styleUrls: ['./add-cic-dialog.component.scss']
})
export class AddCicDialogComponent implements OnInit {
  searchForm: FormGroup;
  isLoading = false;
  constructor(
    private formBuilder: FormBuilder,
    public toastr: ToastsManager,
    private router: Router,
    private http: Http,
    vcr: ViewContainerRef, public dialogRef: MatDialogRef<AddCicDialogComponent>) {
    this.toastr.setRootViewContainerRef(vcr);
  }

  ngOnInit() {
    this.createForm();
  }
  Close() {
    this.dialogRef.close();
    // this.router.navigate(['/application-management'], { replaceUrl: true });
  }

  saveCic(event) {
    this.isLoading = true;
    const vm = this;
    this.http.post('http://localhost:8080/cic', vm.searchForm.value)
    .map((response) => response.json())
        .subscribe((res: Cic) => {
          if (res.cicId) {
            vm.toastr.success('Cic created successfully', 'Add Cic', {dismiss: 'controlled'})
                .then((toast: Toast) => {
                    setTimeout(() => {
                        vm.toastr.dismissToast(toast);
                        vm.dialogRef.close();
                    }, 3000);
                });
          } else {
            vm.toastr.success('Cic not added', 'Add Cic');
          }
        });
      }
  private createForm() {
    this.searchForm = this.formBuilder.group({
      CicId: ['', Validators.required],
      CicType: ['', Validators.required],
      Subject: ['', Validators.required],
      Body: ['', Validators.required],
      SourceSystem: ['', Validators.required],
        EmailId: ['', Validators.required],
        EmailName: ['', Validators.required],
        EmailAddress: ['', Validators.required],
    });
  }

}