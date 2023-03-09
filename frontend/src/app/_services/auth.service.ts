import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs/internal/BehaviorSubject';
import { TokenService } from './token.service';
import { Observable } from 'rxjs';
import { User } from '@app/_interfaces/user.interface';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private userState: BehaviorSubject<boolean>;
  userAuthState:Observable<boolean> ;
  private userActual: BehaviorSubject<User>;
  userAuthActual:Observable<User> ;
  constructor(
    public token: TokenService
  ) {
    // this.userState= new BehaviorSubject<boolean>(this.token.isLoggedIn());
    this.userState= new BehaviorSubject<boolean>(true);
    //for example
    this.userAuthState= this.userState.asObservable()
    this.userActual= new BehaviorSubject<User>(<User>{});
    //for example
    this.userAuthActual= this.userActual.asObservable()

   }
  setAuth(value: boolean,user:User) {
    this.userState.next(value);
    if(value==true){
      this.userActual.next(user);
    }
  }
  
}