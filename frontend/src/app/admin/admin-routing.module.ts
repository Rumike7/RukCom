import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { BooksComponent } from './books.component';

import { HomeComponent } from './home.component';
import { MessagesComponent } from './messages.component';
import { TeamMemberComponent } from './team-member.component';
import { ProductsComponent } from './products/products.component';

const routes: Routes = [
    {
        path: '', component: HomeComponent,
        children: [
            { path: 'products', component: ProductsComponent },
            { path: 'books', component: BooksComponent },
            { path: 'messages', component: MessagesComponent },
            { path: 'team', component: TeamMemberComponent },
        ]
    },
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class AdminRoutingModule { }
