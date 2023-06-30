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
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CheckoutComponent } from './checkout/checkout.component';
import { OrdersComponent } from './orders/orders.component';
import { OrderDetailsComponent } from './order-details/order-details.component';
import { PayOnlineComponent } from './pay-online/pay-online.component';
import { RatingComponent } from './rating/rating.component';



@NgModule({
  declarations: [
    LeftsidebarComponent,
    HomeComponent,
    ProductCardComponent,
    ProductsComponent,
    ProductDetailsComponent,
    HelpComponent,
    CartComponent,
    CartItemComponent,
    CheckoutComponent,
    OrdersComponent,
    OrderDetailsComponent,
    PayOnlineComponent,
    RatingComponent
  ],
  imports: [
    CommonModule,
    NavComponent,
    DefaultRoutingModule,
    FormsModule,
    ReactiveFormsModule
  ]
})
export class DefaultModule { }
