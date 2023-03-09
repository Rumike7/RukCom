import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

import { UploadRoutingModule } from './upload-routing.module';

import { LayoutComponent } from './layout.component';
import { UploadFileComponent } from './upload-file.component';


import { MaterialModule } from 'src/app/material.module';
import { HttpClientModule } from '@angular/common/http';
import { UploadingComponent } from './uploading.component';

@NgModule({
    imports: [
        CommonModule,
        ReactiveFormsModule,
        UploadRoutingModule,
        MaterialModule,
        HttpClientModule
    ],
    declarations: [
        LayoutComponent,
        UploadFileComponent,
        UploadingComponent,

    ]
})
export class UploadModule { }


