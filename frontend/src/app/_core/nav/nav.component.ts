import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { RouterModule } from '@angular/router';
import { User } from '@app/_interfaces/user.interface';
import { AccountService } from '@app/_services/account.service';
import { ProductService } from '@app/_services/product.service';
import { first } from 'rxjs/operators';

@Component({
  standalone: true,
  imports:[CommonModule,RouterModule],
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.scss']
})
export class NavComponent implements OnInit {

  user!:User;
  constructor(
    private accountService: AccountService,
    private productService: ProductService,
    ) { }

  ngOnInit(): void {
    this.user=this.accountService.userValue;
  }
  logout(){
    this.accountService.logout();
  }
  search(input: string) {
    console.log("search function");
    this.productService.getWithKeys(input);
  }

}
