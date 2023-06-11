import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { environment } from '../../environments/environment';
import { User } from '../_interfaces/user.interface';

@Injectable({ providedIn: 'root' })
export class AccountService {
    private userSubject: BehaviorSubject<User>;
    public user: Observable<User>;

    constructor(
        private router: Router,
        private http: HttpClient
    ) {
        this.userSubject = new BehaviorSubject<User>(JSON.parse(<string>localStorage.getItem('user')));
        this.user = this.userSubject.asObservable();
    }

    public get userValue(): User {
        return this.userSubject.value;
    }

    login(username:string, password:string) {
        return this.http.post<User>(`/api/auth/login`, { username, password })
            .pipe(map( (data:any) => {
                // data  [
                //     'access_token' => $token,
                //     'token_type' => 'Bearer',
                //     'user' => $user,
                // ]
                const user=data["user"];
                // store user details and jwt token in local storage to keep user logged in between page refreshes
                this.saveAndEmit(user);
                return user;
            }));
    }

    saveAndEmit(user:User){
      console.log(user);
      localStorage.setItem('user', JSON.stringify(user));
      this.userSubject.next(user);
    }

    logout() {
        // remove user from local storage and set current user to null
        localStorage.removeItem('user');
        this.userSubject.next(<any>null);
        this.router.navigate(['/account/login']);
    }

    register(user: User) {
        return this.http.post(`/api/auth/register`, user)
         .pipe(map(x => {

            this.saveAndEmit(<User>x);
            return x;
      }));;
    }

    getAll() {
        return this.http.get<User[]>(`/api/users`);
    }

    getById(id: string) {
        return this.http.get<User>(`/api/users/${id}`);
    }

    update(id: string, user: User) {
        return this.http.put(`/api/users/${id}`, user)
            .pipe(map(x => {
                // update stored user if the logged in user updated their own record
                if (id == this.userValue.id) {
                    // update local storage
                    this.saveAndEmit(user);
                }
                return x;
            }));
    }

    delete(id: string) {
        return this.http.delete(`/api/users/${id}`)
            .pipe(map(x => {
                // auto logout if the logged in user deleted their own record
                if (id == this.userValue.id) {
                    this.logout();
                }
                return x;
            }));
    }
}

