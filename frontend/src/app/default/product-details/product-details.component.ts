import { Product } from '@app/_interfaces/product.interface';
import { Component, OnInit, EventEmitter, Output } from '@angular/core';
import { ProductService } from '@app/_services/product.service';
import { ActivatedRoute, Router } from '@angular/router';
import { AlertService } from '@app/_services/alert.service';
import { GeneralService } from '@app/_services/general.service';
import { Observable } from 'rxjs';
import { CartService } from '@app/_services/cart.service';

@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.scss']
})
export class ProductDetailsComponent implements OnInit {
  product!: Product;
  products: Product[]=[];
  quantity:number=0;
  @Output() productAdded = new EventEmitter();
  constructor(
    private productService: ProductService,
    private cartService: CartService,
    private route: ActivatedRoute,
    private router: Router,
    private alert: AlertService,
    public general: GeneralService
  ) {
  }
  ngOnInit(): void {
    const productId=Number(this.route.snapshot.paramMap.get('id'));
    console.log({productId});
    this.getProduct(productId);
  }

  addToCard(){
    this.quantity=1;
    this.add();
  }
  add(){
    this.cartService.addToCart(this.product,this.quantity);
    this.productAdded.emit(this.product);
  }

  RemoveFromCard(){
    this.quantity=0;
  }

  decreaseQuantity(){
    if(this.quantity>0)this.quantity--;
    this.add();
  }

  increaseQuantity(){
    this.quantity++;
    this.add();
  }

  getProduct(id:number){
    this.productService.get(id).subscribe({
      next:(res:Product)=>{
        this.product=res;
        this.quantity=this.cartService.getQuantity(this.product);
        this.products=this.productService.allProducts.value;
        this.products=this.general.shuffle(this.products);
        this.products=this.products.slice(0,3);
        console.log(res);
      },
      error:(err:any)=>{
        console.log(err);
        this.alert.error(err);
        this.router.navigate(['..']);
      }
    });
    this.router.navigate(['/default/products/',id]);
  }
}
