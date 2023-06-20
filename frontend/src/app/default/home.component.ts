import { Component, OnInit } from '@angular/core';
import { CartService } from '@app/_services/cart.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  isVisibilityCart:boolean=false;
  constructor(
    private cartService: CartService,
  ) {
  }

  ngOnInit(): void {
    // this.cartService.openedCart.subscribe(r=>{
    //   this.isVisibilityCart=r;
    //   console.log("isVisibilityCart");
    //   console.log(r);
    // });
  }

  handleVisibilityCartChange(event:any) {
    const fakeCartItem = document.getElementById("fake-cart-item") as HTMLAnchorElement;
    if(!fakeCartItem){
      console.log("NOT FOUND");
      return;
    }
    fakeCartItem.click();
    console.log("CLICKED");
  }

}
