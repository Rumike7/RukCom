import { Component, Input, OnInit } from '@angular/core';
import { Product } from '@app/_interfaces/product.interface';
import { GeneralService } from '@app/_services/general.service';
import { ProductService } from '@app/_services/product.service';

@Component({
  selector: 'app-product-card',
  templateUrl: './product-card.component.html',
  styleUrls: ['./product-card.component.scss']
})
export class ProductCardComponent implements OnInit {
  @Input() product!:Product;
  constructor(
    public general:GeneralService
  ) { }

  ngOnInit(): void {
  }

  

}
