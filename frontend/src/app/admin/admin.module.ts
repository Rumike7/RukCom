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
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { OrdersComponent } from './orders/orders.component';



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
    AsidebarComponent,
    OrdersComponent
  ],
  imports: [
    CommonModule,
    AdminRoutingModule,
    ReactiveFormsModule,
    FormsModule
  ]
})
export class AdminModule { }
