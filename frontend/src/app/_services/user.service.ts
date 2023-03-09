import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Subject } from 'rxjs';
import { Observable, throwError } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';
// import 'rxjs/add/operator/toPromise';

import {User} from '../interfaces/user.interface';
import { Infos } from '../interfaces/info.interface';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  readonly ROOT_URL = "http://getway/backend/public/api/user";
  private user!:User;
  userSubject = new Subject<User>();
  constructor(private http:HttpClient) { }
  emitUsers() {
    this.userSubject.next(this.user);
  }

  verifyAUser(emailname:string,password:string):boolean{
      return false;
  }
  getActualUser():User{ return this.user}
  getUserFromServer(emailname:string){
    this.http.get<User>(this.ROOT_URL).subscribe(
      (user:User)=>{
          this.user=user;
      },
      (error) => {
        console.log('Erreur ! : ' + error);
      }
    );
  }
  postUser(user:User) {
    return this.http.post<Infos>(this.ROOT_URL+"/add",JSON.stringify(user));
  }
    getUsersFromServer() {
    this.http
      .get<User>(this.ROOT_URL,{responseType: 'json'})
      .subscribe(
        (response) => {
          this.user = response;
          this.emitUsers();
        },
        (error) => {
          console.log('Erreur ! : ' + error);
        }
      );
  } 
 


}