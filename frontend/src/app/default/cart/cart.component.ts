import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';
import { CartItem } from '@app/_interfaces/product.interface';
import { CartService } from '@app/_services/cart.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss']
})
export class CartComponent implements OnInit {
  cartItems: CartItem[]=[];
  @Output() cartVisbilityChanged = new EventEmitter();
  constructor(
    private cartService: CartService,
    private router: Router,
  ) { }

  ngOnInit(): void {
    this.cartService.allCartItems.subscribe(r=>{
      this.cartItems=r;
    });
  }

  removeFromCart(item:CartItem){
    this.cartService.removeFromCart(item.product);
  }
  addToFavorite(item:CartItem){

  }
  updateCartItem(item:CartItem, quantity:number){
    this.cartService.addToCart(item.product,quantity);
  }

  calculateTotal(){
    return this.cartService.calculateTotal();
  }
  calculateDiscount(){
    return 0;
  }

 changeVisibilityCartAndRouteToHome(){
   this.cartVisbilityChanged.emit(true);
   this.router.navigate(['/']);
  }

  purchase(){
    this.cartVisbilityChanged.emit(true);
    this.router.navigate(['/default/checkout']);
  } 


}
