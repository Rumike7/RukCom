import { AlertService } from './../_services/alert.service';
import { Injectable } from '@angular/core';
import { Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';

import { AccountService } from 'src/app/_services/account.service';

@Injectable({ providedIn: 'root' })
export class AdminGuard implements CanActivate {
    constructor(
        private router: Router,
        private accountService: AccountService,
        private alertService: AlertService
    ) {}

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        const user = this.accountService.userValue;
        if (user && user.admin) {
            return true;
        }
        this.alertService.error("You are not admin ou are you are not logged")
        this.router.navigate(['/account/register'], { queryParams: { returnUrl: state.url }});
        return false;
    }
}
