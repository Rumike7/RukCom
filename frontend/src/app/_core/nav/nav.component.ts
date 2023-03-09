import { Component, OnInit } from '@angular/core';
import { User } from '@app/_interfaces/user.interface';
import { AccountService } from '@app/_services/account.service';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.scss']
})
export class NavComponent implements OnInit {

  user!:User;
  constructor(private accountService: AccountService) { }

  ngOnInit(): void {
    this.user=this.accountService.userValue;
  }

}
