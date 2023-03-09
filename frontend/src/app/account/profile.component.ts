import { Component, OnInit } from '@angular/core';
import { User } from '@app/_interfaces/user.interface';
import { AccountService } from '@app/_services/account.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit{
  user:User;

  constructor(private accountService:AccountService){
    this.user= this.accountService.userValue;
  }

  ngOnInit(): void {

  }


}
