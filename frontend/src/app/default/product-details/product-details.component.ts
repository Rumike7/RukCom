import { Product } from '@app/_interfaces/product.interface';
import { Component, OnInit } from '@angular/core';
import { ProductService } from '@app/_services/product.service';
import { ActivatedRoute, Router } from '@angular/router';
import { AlertService } from '@app/_services/alert.service';
import { GeneralService } from '@app/_services/general.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.scss']
})
export class ProductDetailsComponent implements OnInit {
  product!: Product;
  constructor(
    private productService: ProductService,
    private route: ActivatedRoute,
    private router: Router,
    private alert: AlertService,
    public general: GeneralService
  ) { 
  }

  ngOnInit(): void {

    const productId=Number(this.route.snapshot.paramMap.get('id'));
    this.productService.get(productId).subscribe({
      next:(res:Product)=>{
        this.product=res;
        console.log(res);
      }, 
      error:(err:any)=>{
        console.log(err);
        this.alert.error(err);
        this.router.navigate(['..']);
      }
    });
  }
  addToCard(){
    
  }
}
