import { AppModule } from '@app/app.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeComponent } from './home.component';
import { BooksComponent } from './books.component';
import { MessagesComponent } from './messages.component';
import { TeamMemberComponent } from './team-member.component';
import { SellerRoutingModule } from './seller-routing.module';
import { IndexComponent } from './index.component';
import { NavComponent } from '@app/_core/nav/nav.component';



@NgModule({
  declarations: [
    HomeComponent,
    BooksComponent,
    MessagesComponent,
    TeamMemberComponent,
    IndexComponent,
  ],
  imports: [
    CommonModule,
    SellerRoutingModule,
    NavComponent
  ]
})
export class SellerModule { }
