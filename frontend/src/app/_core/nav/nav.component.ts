import { CommonModule } from '@angular/common';
import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { RouterModule } from '@angular/router';
import { User } from '@app/_interfaces/user.interface';
import { AccountService } from '@app/_services/account.service';
import { CartService } from '@app/_services/cart.service';
import { ProductService } from '@app/_services/product.service';
import { CartComponent } from '@app/default/cart/cart.component';
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
  @Output() cartVisbilityChanged = new EventEmitter();
  constructor(
    private accountService: AccountService,
    private productService: ProductService,
    private cartService: CartService,
  ) { }

  ngOnInit(): void {
    this.user=this.accountService.userValue;
  }
  logout(){
    this.accountService.logout();
  }
  search(input: string) {
    this.productService.getWithKeys(input);
  }
  changeVisibilityCart(){
     this.cartVisbilityChanged.emit(true);
  }

}
