import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavComponent } from '@app/_core/nav/nav.component';
import { LeftsidebarComponent } from './leftsidebar/leftsidebar.component';
import { HomeComponent } from './home.component';
import { ProductCardComponent } from './product-card/product-card.component';
import { ProductsComponent } from './products/products.component';
import { DefaultRoutingModule } from './default-routing.module';
import { ProductDetailsComponent } from './product-details/product-details.component';
import { HelpComponent } from './help/help.component';
import { CartComponent } from './cart/cart.component';
import { CartItemComponent } from './cart-item/cart-item.component';
import { FormsModule } from '@angular/forms';



@NgModule({
  declarations: [
    LeftsidebarComponent,
    HomeComponent,
    ProductCardComponent,
    ProductsComponent,
    ProductDetailsComponent,
    HelpComponent,
    CartComponent,
    CartItemComponent
  ],
  imports: [
    CommonModule,
    NavComponent,
    DefaultRoutingModule,
    FormsModule
  ]
})
export class DefaultModule { }
