import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AdminRoutingModule } from './admin-routing.module';
import { HomeComponent } from './home.component';
import { BooksComponent } from './books.component';
import { MessagesComponent } from './messages.component';
import { TeamMemberComponent } from './team-member.component';



@NgModule({
  declarations: [
    HomeComponent,
    BooksComponent,
    MessagesComponent,
    TeamMemberComponent
  ],
  imports: [
    CommonModule,
    AdminRoutingModule
  ]
})
export class AdminModule { }
