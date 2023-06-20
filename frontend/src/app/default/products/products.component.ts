import { Component, OnInit } from '@angular/core';
import { Product } from '@app/_interfaces/product.interface';
import { ProductService } from '@app/_services/product.service';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss']
})
export class ProductsComponent implements OnInit {
  products: Product[]=[];
  numberPerPage:number=6;
  pagesFromOne:number[]=[];
  page:number=0;
  numberOfPage:number=0;

  constructor(
    private productService: ProductService,
  ) { }

  ngOnInit(): void {
    this.productService.fildtredProducts.subscribe((res:Product[])=>{
      this.products=res;
      const numProduct=this.products.length;
      this.numberOfPage=Math.ceil(numProduct/this.numberPerPage);
      for(let i=0;i<this.numberOfPage;i++){
        this.pagesFromOne.push(i+1);
      }
      console.log(this.products);
    });
  }

  precPage(){
    if(this.page>0)this.page--;
  }

  selectPage(page:number){
    this.page=page;
  }

  nextPage(){
    if(this.page<this.numberOfPage-1)this.page++;
  }



}
