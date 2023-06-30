import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Order } from '@app/_interfaces/product.interface';
import { OrderService } from '@app/_services/order.service';

@Component({
  selector: 'app-order-details',
  templateUrl: './order-details.component.html',
  styleUrls: ['./order-details.component.scss']
})
export class OrderDetailsComponent implements OnInit {
  order!:Order;
  constructor(
    private orderService: OrderService,
    private router: Router,
    private route: ActivatedRoute,
  ) { }

  ngOnInit(): void {
    const orderId=Number(this.route.snapshot.paramMap.get('id'));
    console.log({orderId});
    this.orderService.getByUser(orderId).subscribe((res:Order) => {
      console.log({res});
      this.order=res;
    })
  }

  tooglePaid(){
    this.order.paid=!this.order.paid;
    console.log('tooglePaid');
    this.orderService.update(this.order,this.order.id).subscribe((res:Order) => {
      console.log({res});
    })
  }
  payOnline(){
    this.router.navigate(['/default/pay-online'], { queryParams: { orderId: this.order.id }});
  }

}
