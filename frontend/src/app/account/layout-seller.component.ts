import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AccountService } from '@app/_services/account.service';

@Component({
  selector: 'app-layout-seller',
  templateUrl: './layout-seller.component.html',
  styleUrls: ['./layout-seller.component.scss']
})
export class LayoutSellerComponent implements OnInit {

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
  ngOnInit(): void {
    throw new Error('Method not implemented.');
  }
  isLogin(){
      return this.router.url==='/account/auth/login';
  }
  md(){
      if(window.innerWidth>800)return true;
      return false;
  }

}
