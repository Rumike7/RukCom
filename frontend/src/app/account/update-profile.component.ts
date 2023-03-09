import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { User } from '@app/_interfaces/user.interface';
import { AccountService } from '@app/_services/account.service';
import { AlertService } from '@app/_services/alert.service';
import { first } from 'rxjs/operators';

@Component({
  selector: 'app-profile',
  templateUrl: './update-profile.component.html',
  styleUrls: ['./update-profile.component.scss']
})
export class UpdateProfileComponent {
  user:User;
  loading: boolean= false;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private accountService: AccountService,
    private alertService: AlertService
  ) {
    this.user= this.accountService.userValue;
  }


  ngOnInit(): void {

  }

  updateProfile() {
    console.log(this.user);
    this.loading=true;
    this.accountService.update(this.user.id, this.user)
    .pipe(first())
            .subscribe({
                next: () => {
                    this.alertService.success('Updating successful', { keepAfterRouteChange: true });

                    const returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';
                    this.router.navigateByUrl(returnUrl);
                },
                error: error => {
                    this.alertService.error(error);
                    console.log("error ");
                    this.loading = false;
                }
            });
  }
}
