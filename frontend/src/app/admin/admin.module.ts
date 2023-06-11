import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AdminRoutingModule } from './admin-routing.module';
import { HomeComponent } from './home.component';
import { BooksComponent } from './books.component';
import { MessagesComponent } from './messages.component';
import { TeamMemberComponent } from './team-member.component';
import { ProductsComponent } from './products/products.component';
import { SidebarComponent } from './sidebar/sidebar.component';
import { TopbarComponent } from './topbar/topbar.component';
import { FooterComponent } from './footer/footer.component';
import { AsidebarComponent } from './asidebar/asidebar.component';
import { ReactiveFormsModule } from '@angular/forms';



@NgModule({
  declarations: [
    HomeComponent,
    BooksComponent,
    MessagesComponent,
    TeamMemberComponent,
    ProductsComponent,
    SidebarComponent,
    TopbarComponent,
    FooterComponent,
    AsidebarComponent
  ],
  imports: [
    CommonModule,
    AdminRoutingModule,
    ReactiveFormsModule
  ]
})
export class AdminModule { }
