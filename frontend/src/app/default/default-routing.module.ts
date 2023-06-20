import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ProductsComponent } from './products/products.component';
import { HomeComponent } from './home.component';
import { ProductDetailsComponent } from './product-details/product-details.component';
import { CartComponent } from './cart/cart.component';
import { HelpComponent } from './help/help.component';

const routes: Routes = [
  {
    path: '', component: HomeComponent ,
    children: [
        {path: 'products', component: ProductsComponent },
        {path: 'products/:id', component: ProductDetailsComponent },
        {path: 'help', component: HelpComponent },
        {path: 'cart', component: CartComponent},
        {path: '', redirectTo: 'products', pathMatch:'full'},
    ]
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DefaultRoutingModule { }
