import { Component, OnInit } from '@angular/core';
import { AccountService } from '@app/_services/account.service';

@Component({
  selector: 'app-asidebar',
  templateUrl: './asidebar.component.html',
  styleUrls: ['./asidebar.component.scss']
})
export class AsidebarComponent implements OnInit {

  constructor(private accountService: AccountService) { }

  ngOnInit(): void {
  }

  logout(){
    this.accountService.logout();
  }

}
