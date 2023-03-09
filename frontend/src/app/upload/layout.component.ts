import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { User } from '@app/_interfaces/user.interface';
import { AccountService } from '@app/_services/account.service';
import { AlertService } from '@app/_services/alert.service';
import { FileUploadService } from '@app/_services/file-upload.service';

@Component({
  selector: 'app-layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.scss']
})
export class LayoutComponent implements OnInit,OnDestroy {
  requiredFileType!:string;
  user!:User;
  form!: FormGroup;
  loading = false;
  submitted = false;

  constructor(
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private fileUploadService: FileUploadService,
    private accountService: AccountService,
    private alertService: AlertService
) { }

  ngOnInit(): void {
    this.form = this.formBuilder.group({
      faculty: ['', Validators.required],
      domain: ['', Validators.required]
    });
    console.log("Upload Layout");
    this.user=this.accountService.userValue;
    console.log(this.user);
  }
  get f() { return this.form.controls; }

  ngOnDestroy(): void {
    this.fileUploadService.setFileForm(
      {
        "faculty": this.form.value.faculty||" ",
        "domain": this.form.value.domain|| " ",
      }
      );
  }

}
