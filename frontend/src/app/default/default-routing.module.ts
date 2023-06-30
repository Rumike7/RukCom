import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ProductsComponent } from './products/products.component';
import { HomeComponent } from './home.component';
import { ProductDetailsComponent } from './product-details/product-details.component';
import { CartComponent } from './cart/cart.component';
import { HelpComponent } from './help/help.component';
import { OrdersComponent } from './orders/orders.component';
import { CheckoutComponent } from './checkout/checkout.component';
import { OrderDetailsComponent } from './order-details/order-details.component';
import { PayOnlineComponent } from './pay-online/pay-online.component';

const routes: Routes = [
  {
    path: '', component: HomeComponent ,
    children: [
        {path: 'products', component: ProductsComponent },
        {path: 'products/:id', component: ProductDetailsComponent },
        {path: 'help', component: HelpComponent },
        {path: 'cart', component: CartComponent},
        {path: 'orders', component: OrdersComponent},
        {path: 'orders/:id', component: OrderDetailsComponent },
        {path: 'checkout', component: CheckoutComponent},
        {path: 'pay-online', component: PayOnlineComponent},
        {path: '', redirectTo: 'products', pathMatch:'full'},
    ]
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DefaultRoutingModule { }
