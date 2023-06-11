import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';


import { AccountRoutingModule } from './account-routing.module';
import { LayoutComponent } from './layout.component';
import { LoginComponent } from './login.component';
import { RegisterComponent } from './register.component';

import { MaterialModule } from 'src/app/material.module';
import { UpdateProfileComponent } from './update-profile.component';
import { ProfileComponent } from './profile.component';
import { LayoutSellerComponent } from './layout-seller.component';

@NgModule({
    imports: [
        CommonModule,
        HttpClientModule,
        ReactiveFormsModule,
        AccountRoutingModule,
        MaterialModule,
        FormsModule
    ],
    declarations: [
        LayoutComponent,
        LoginComponent,
        RegisterComponent,
        UpdateProfileComponent,
        ProfileComponent,
        LayoutSellerComponent
    ],
    providers:[HttpClientModule ]
})
export class AccountModule { }
