import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
//import { AnyNaptrRecord } from 'dns';
import { Observable, throwError } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';
// import 'rxjs/add/operator/toPromise';
import { environment } from 'src/environments/environment';

import {User} from 'src/app/_interfaces/user.interface';

@Injectable({
  providedIn: 'root'
})
export class AuthApiService {
  readonly ROOT_URL = environment.apiUrl+"auth";

  constructor(private http:HttpClient){}

  signUp(user: User): Observable<any> {
    return this.http.post(this.ROOT_URL+'/register', user);
  }

  signIn(user: User): Observable<any> {
    return this.http.post<any>(this.ROOT_URL+'/login', user);
  }

  profileUser(): Observable<any> {
    return this.http.get(this.ROOT_URL+'/user-profile');
  }
}

