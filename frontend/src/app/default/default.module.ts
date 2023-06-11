import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavComponent } from '@app/_core/nav/nav.component';
import { LeftsidebarComponent } from './leftsidebar/leftsidebar.component';
import { HomeComponent } from './home.component';
import { ProductCardComponent } from './product-card/product-card.component';
import { ProductsComponent } from './products/products.component';
import { DefaultRoutingModule } from './default-routing.module';
import { ProductDetailsComponent } from './product-details/product-details.component';



@NgModule({
  declarations: [
    LeftsidebarComponent,
    HomeComponent,
    ProductCardComponent,
    ProductsComponent,
    ProductDetailsComponent
  ],
  imports: [
    CommonModule,
    NavComponent,
    DefaultRoutingModule
  ]
})
export class DefaultModule { }
