import { Component, OnInit } from '@angular/core';
import { Order } from '@app/_interfaces/product.interface';
import { User } from '@app/_interfaces/user.interface';
import { AccountService } from '@app/_services/account.service';
import { OrderService } from '@app/_services/order.service';
import { lastValueFrom } from 'rxjs';

@Component({
  selector: 'app-orders',
  templateUrl: './orders.component.html',
  styleUrls: ['./orders.component.scss']
})
export class OrdersComponent implements OnInit {
  status=['validation','shipping','done'];
  orders:Order[]=[];
  constructor(
    private orderService: OrderService,
    private accountService: AccountService,
  ) { }

  ngOnInit(): void {
    this.orderService.getAll().subscribe((res:Order[]) => {
      console.log({res});
      this.orders=res;
      console.log(this.orders);
    })
  }


  updateStatus(order:Order){
    let id=this.status.findIndex(el=>el==order.status);
    id=(id+1)%3;
    order.status=this.status[id];

    console.log('updateStatus');
    this.orderService.update(order,order.id).subscribe((res:Order) => {
      console.log({res});
    })
  }
  tooglePaid(order:Order){
    order.paid=!order.paid;
    console.log('tooglePaid');
    this.orderService.update(order,order.id).subscribe((res:Order) => {
      console.log({res});
    })
  }


}
