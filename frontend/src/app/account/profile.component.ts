import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ShippingAddress, User } from '@app/_interfaces/user.interface';
import { AccountService } from '@app/_services/account.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit{
  user:User;
  userShippingAddress!:ShippingAddress;

  constructor(
    private http: HttpClient,
    private accountService:AccountService,
    ){
    this.user= this.accountService.userValue;
    console.log(this.user);
  }

  ngOnInit(): void {
    if(this.user.shipping_address_id){
      const url = `/api/shipping/${this.accountService.userValue.shipping_address_id}/`;
      this.http.get<ShippingAddress>(url).subscribe((r:ShippingAddress)=>{
        if(r)this.userShippingAddress=r;
      });
    }
  }

  logout(){
    this.accountService.logout();
  }


}
