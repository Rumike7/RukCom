import { firstValueFrom } from 'rxjs';
import { Component, OnInit } from '@angular/core';
import { Order } from '@app/_interfaces/product.interface';
import { AccountService } from '@app/_services/account.service';
import { OrderService } from '@app/_services/order.service';
import { RatingService } from '@app/_services/rating.service';

@Component({
  selector: 'app-orders',
  templateUrl: './orders.component.html',
  styleUrls: ['./orders.component.scss']
})
export class OrdersComponent implements OnInit {

  orders:Order[]=[];
  selectedOrder!:Order;
  constructor(
    private orderService: OrderService,
    private ratingService: RatingService,
    private accountService: AccountService,

  ) { }

  ngOnInit(): void {
    this.orderService.getAllByUser().subscribe((res:Order[]) => {
      console.log({res});
      this.orders=res.slice().reverse();
      console.log(this.orders);
    })
  }
  delete(id:number){
    this.orderService.deleteByUser(id).subscribe(del=>{
      console.log({del});
      location.reload();
    });
  }
  selectOrder(order:Order){
    this.orderService.selectOrder(order);
  }

}
