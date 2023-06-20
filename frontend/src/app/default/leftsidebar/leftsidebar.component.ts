import { Component, OnInit } from '@angular/core';
import { Product} from '@app/_interfaces/product.interface';
import { AdminEnumsService } from '@app/_services/admin-enums.service';
import { ProductService } from '@app/_services/product.service';

@Component({
  selector: 'app-leftsidebar',
  templateUrl: './leftsidebar.component.html',
  styleUrls: ['./leftsidebar.component.scss']
})
export class LeftsidebarComponent implements OnInit {
  catCount:number[]=[];
  brCount:number[]=[];

  products: Product[]=[];
  constructor(
    private productService: ProductService,
    public enums: AdminEnumsService,

  ) { }

  ngOnInit(): void {
    this.productService.allProducts.subscribe((res:Product[])=>{
      this.catCount=this.countProductsByCategory(res,this.enums.categories);
      this.brCount=this.countProductsByBrand(res,this.enums.brands);
    });
    this.productService.fildtredProducts.subscribe((res:Product[])=>{
      this.products=res;
      console.log(this.products);
    });
  }

  countProductsByCategory(products: Product[], categories: readonly string[]): number[] {
    const countArray: number[] = new Array(this.enums.categories.length).fill(0);
  
    for (const product of products) {
      if(!product.category)continue;
      const categoryIndex = categories.indexOf(product.category);
      if (categoryIndex !== -1) {
        countArray[categoryIndex]++;
      }
    }
  
    return countArray;
  }
  countProductsByBrand(products: Product[], brands: readonly string[]): number[] {
    const countArray: number[] = new Array(this.enums.brands.length).fill(0);
  
    for (const product of products) {
      if(!product.brand)continue;
      const categoryIndex = brands.indexOf(product.brand);
      if (categoryIndex !== -1) {
        countArray[categoryIndex]++;
      }
    }
  
    return countArray;
  }

  filterByCategory(category:string){
    this.productService.allProducts.subscribe((res:Product[])=>{
      this.products=res;
      const filtredProducts=this.products.filter(p=>p.category==category);
      this.productService.fildtredProducts.next(filtredProducts);
    });
  }
  filterByBrand(brand:string){
    this.productService.allProducts.subscribe((res:Product[])=>{
      this.products=res;
      const filtredProducts=this.products.filter(p=>p.brand==brand);
      this.productService.fildtredProducts.next(filtredProducts);
    });

  }


}
