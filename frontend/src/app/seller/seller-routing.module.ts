import { IndexComponent } from './index.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { SellerGuard } from '@app/_guards/seller.guard';
import { BooksComponent } from './books.component';

import { HomeComponent } from './home.component';
import { MessagesComponent } from './messages.component';
import { TeamMemberComponent } from './team-member.component';

const routes: Routes = [
    {
        path: 'index', component: IndexComponent,
    },
    {
        path: 'home', component: HomeComponent,
        children: [
            { path: 'books', component: BooksComponent },
            { path: 'messages', component: MessagesComponent },
            { path: 'team', component: TeamMemberComponent },
        ],
        canActivate: [SellerGuard]
    },
    {path:'', pathMatch: 'full', redirectTo: 'index'},

];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class SellerRoutingModule { }
