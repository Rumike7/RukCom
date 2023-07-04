import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';

import{HttpClientModule} from '@angular/common/http';
import { fakeBackendProvider } from './_interceptors/fake-backend.interceptor';
import { MaterialModule } from './material.module';


import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavComponent } from './_core/nav/nav.component';
import { BooksListComponent } from './book/books-list/books-list.component';
import { BookComponent } from './book/book/book.component';
import { SearchBarComponent } from './search/search-bar/search-bar.component';
import { NewsletterComponent } from './other/newsletter/newsletter.component';
import { AlertComponent } from './alert/alert.component';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { JwtInterceptor } from './_interceptors/jwt.interceptor';
import { ErrorInterceptor } from './_interceptors/error.interceptor';
import { HomeComponent } from './home/home.component';
import { PreviewComponent } from './preview/preview.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ContactComponent } from './contact/contact.component';
import { TestComponent } from './test/test.component';
@NgModule({
  declarations: [
    AppComponent,
    BooksListComponent,
    BookComponent,
    SearchBarComponent,
    NewsletterComponent,
    HomeComponent,
    PreviewComponent,
    ContactComponent,
    TestComponent,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    MaterialModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    NavComponent
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true },

    // provider used to create fake backend
    // fakeBackendProvider
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
