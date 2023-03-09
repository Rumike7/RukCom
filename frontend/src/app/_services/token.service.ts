import { Injectable } from '@angular/core';
@Injectable({
  providedIn: 'root'
})

export class TokenService {
  private issuer = {
    login: 'http://127.0.0.1:8000/api/auth/login',
    register: 'http://127.0.0.1:8000/api/auth/register'
  }
  constructor() { }
  handleData(token:any){
    localStorage.setItem('auth_token', token);
  }
  getToken(){
    return localStorage.getItem('auth_token');
  }
  // Verify the token
  isValidToken():boolean{
     const token = this.getToken();
     if(token){
       if(token){
         return  true;
       }
       else return false;
     } else {
        return false;
     }
  }
  // User state based on valid token
  isLoggedIn():boolean {
    return this.isValidToken();
  }
  // Remove token
  removeToken(){
    localStorage.removeItem('auth_token');
  }
}