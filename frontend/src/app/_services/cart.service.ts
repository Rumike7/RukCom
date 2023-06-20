import { Injectable } from '@angular/core';
import { CartItem, Product } from '@app/_interfaces/product.interface';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CartService {
  allCartItems=new BehaviorSubject<CartItem[]>([]);
  openedCart=new BehaviorSubject<boolean>(false);
  cartItems$=this.allCartItems.asObservable();
  constructor() { }

  isInCart(product:Product){
    const cartItems=this.allCartItems.value;
    for(var i=0;i<cartItems.length;i++){
      if(cartItems[i].product.id === product.id) return true;
    };
    return false;
  }

  addToCart(product: Product, quantity: number): void {
    const cartItems=this.allCartItems.value;
    if(this.isInCart(product)){
      if(quantity<=0)this.removeFromCart(product);
      else{
        const item = cartItems.find((cartItem) => cartItem.product.id === product.id);
        item!.quantity = quantity;
      }
    }else{
      cartItems.push({ product: product, quantity: 1 });
    }
  }

  removeFromCart(product: Product): void {
    const cartItems=this.allCartItems.value;
    const index = cartItems.findIndex((cartItem) => cartItem.product.id === product.id);
    if (index !== -1) {
      cartItems.splice(index, 1);
    }
  }


  getCartItems(): { product: Product, quantity: number }[] {
    return this.allCartItems.value;
  }

  calculateTotal(): number {
    let total = 0;
    const cartItems=this.allCartItems.value;
    for (const item of cartItems) {
      total += item.product.price * item.quantity;
    }

    return total;
  }

  clearCart(): void {
    this.allCartItems.next([]);
  }
}
