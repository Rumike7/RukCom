import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { Book } from '@app/_interfaces/book.interface';

import {environment} from '@environments/environment';
import { BehaviorSubject, Observable } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class BookService {
  private bookSubject: BehaviorSubject<Book>;
  public book: Observable<Book>;

  constructor(
    private router: Router,
    private http: HttpClient
    ) {
    this.bookSubject = new BehaviorSubject<Book>(JSON.parse(<string>localStorage.getItem('book')));
    this.book = this.bookSubject.asObservable();
  }
  public get bookValue(): Book {
      return this.bookSubject.value;
  }    
  setBook(book:Book){
    localStorage.setItem('book', JSON.stringify(book));
    this.bookSubject.next(book);
  }  
  getUnverifiedBook(){
    return this.http.get<Book[]>(`${environment.apiUrl}/admin/unverifiedBooks`);
  }
  getVerifiedBook(){
    return this.http.get<Book[]>(`${environment.apiUrl}/admin/verifiedBooks`);
  }
  accept(book:Book){
    return this.http.post(`${environment.apiUrl}/admin/accept`, book);
  }
  reject(book:Book){
    return this.http.post(`${environment.apiUrl}/admin/reject`,book);
  }

  getFirstBook(number: number){

  }
  toPreview(book:Book){
    this.setBook(book);
    this.router.navigate(['/preview']);
  }

  search(form:FormGroup<any>,keysearch:boolean){
      return this.http.post(environment.apiUrl+'/search/',{form:form.value,keysearch:keysearch});
  }
}
