import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BooksListComponent } from './book/books-list/books-list.component';

import { AuthGuard } from './_guards/auth.guard';
import { AdminGuard } from './_guards/admin.guard';
import { PreviewComponent } from './preview/preview.component';
import { BookComponent } from './book/book/book.component';
import { ContactComponent } from './contact/contact.component';
import { TestComponent } from './test/test.component';

const accountModule = () => import('./account/account.module').then(x => x.AccountModule);
const uploadModule = () => import('./upload/upload.module').then(x => x.UploadModule);
const adminModule = () => import('./admin/admin.module').then(x => x.AdminModule);
const routes: Routes=[
  {path: 'contact', component: ContactComponent},
  {path: 'preview', component: PreviewComponent},
  {path: 'test', component: TestComponent},
  {path: 'home', component: BooksListComponent},
  {path: 'books/:name/:id', component: BookComponent},
  {path:'', pathMatch: 'full', redirectTo: 'home'},
  {path: 'account', loadChildren: accountModule },
  {path: 'upload', loadChildren: uploadModule , canActivate: [AuthGuard]},
  {path: 'admin', loadChildren: adminModule, canActivate: [AdminGuard]},
]
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {

}

