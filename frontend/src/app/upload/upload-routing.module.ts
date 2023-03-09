import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';


import { LayoutComponent } from './layout.component';
import { UploadingComponent } from './uploading.component';

const routes: Routes = [
    {
        path: '', component: LayoutComponent,
    },
    {
        path: 'uploading', component: UploadingComponent,
    },
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})

export class UploadRoutingModule { }