import { Component } from '@angular/core';
import { Router } from '@angular/router';

import { AccountService } from 'src/app/_services/account.service';

@Component({ 
    templateUrl: 'layout.component.html', styleUrls: ['./layout.component.scss']
})
export class LayoutComponent {
    constructor(
        private router: Router,
        private accountService: AccountService
    ) {
        // redirect to home if already logged in
        if (this.accountService.userValue) {
            console.log("Account Layout Component ");
            console.log(this.accountService.userValue);
            this.router.navigate(['/']);
        }
    }
    isLogin(){
        return this.router.url==='/account/auth/login';
    }
    md(){
        if(window.innerWidth>800)return true;
        return false;
    }
}