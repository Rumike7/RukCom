import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { CartItem, Order } from '@app/_interfaces/product.interface';
import { PaymentMethod, ShippingAddress } from '@app/_interfaces/user.interface';
import { AccountService } from '@app/_services/account.service';
import { AlertService } from '@app/_services/alert.service';
import { CartService } from '@app/_services/cart.service';
import { OrderService } from '@app/_services/order.service';

@Component({
  selector: 'app-pay-online',
  templateUrl: './pay-online.component.html',
  styleUrls: ['./pay-online.component.scss']
})
export class PayOnlineComponent implements OnInit {
  paymentForm!:FormGroup;
  submitted=false;
  codeDigits=['','','','','',''];

  constructor(
    private formBuilder: FormBuilder,
    private cartService: CartService,
    private orderService: OrderService,
    private accountService: AccountService,
    private alertService: AlertService,
    private router: Router,
    private route: ActivatedRoute,
    private http: HttpClient
    ) {
      this.paymentForm = this.formBuilder.group({
          creditCardNumber: ['', Validators.required],
          expirationDate: ['', Validators.required],
          cvv: ['', Validators.required],
          billingAddress: ['', Validators.required]

      });
     }
  ngOnInit(): void {
    if(this.accountService.userValue.payment_method_id){
      const url = `/api/payment/${this.accountService.userValue.payment_method_id}/`;
      this.http.get<PaymentMethod>(url).subscribe((r:PaymentMethod)=>{
        r['cvv']=String(r['cvv']);
        r['creditCardNumber']=String(r['creditCardNumber']);
        if(r)this.paymentForm!.patchValue(r);
      });
    }
  }
  pay(){
    const orderId = Number(this.route.snapshot.queryParams['orderId']);
    this.orderService.get(orderId).subscribe({
      next: (order)=>{
        if(order){
          //TODO: Handle code confirmation
          this.tooglePaid(order);
          this.router.navigate(['default/orders']);
        }
      },
      error: (error)=>{
        
      }
    });

    
    

  }
  tooglePaid(order:Order){
    order.paid=!order.paid;
    console.log('tooglePaid');
    this.orderService.update(order,order.id).subscribe((res:Order) => {
      console.log({res});
    })
  }


}
