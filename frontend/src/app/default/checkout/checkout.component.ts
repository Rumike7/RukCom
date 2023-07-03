import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { CartItem, Order } from '@app/_interfaces/product.interface';
import { PaymentMethod, ShippingAddress } from '@app/_interfaces/user.interface';
import { AccountService } from '@app/_services/account.service';
import { AlertService } from '@app/_services/alert.service';
import { CartService } from '@app/_services/cart.service';
import { OrderService } from '@app/_services/order.service';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.scss']
})
export class CheckoutComponent implements OnInit {
  onboardingForm!:FormGroup;
  cartItems: CartItem[]=[];
  currentStep=1;
  submitted=false;
  constructor(
    private formBuilder: FormBuilder,
    private cartService: CartService,
    private orderService: OrderService,
    private accountService: AccountService,
    private alertService: AlertService,
    private router: Router,
    private http: HttpClient
    ) {
      this.onboardingForm  = this.formBuilder.group({
        shipping: this.formBuilder.group({
          firstName: ['', Validators.required],
          lastName: ['', Validators.required],
          streetAddress: ['', Validators.required],
          city: ['', Validators.required],
          state: ['', Validators.required],
          postalCode: ['', Validators.required],
          country: ['', Validators.required],
          phoneNumber: ['', Validators.required]
        }),
        payment:this.formBuilder.group({
          creditCardNumber: ['', Validators.required],
          expirationDate: ['', Validators.required],
          cvv: ['', Validators.required],
          billingAddress: ['', Validators.required]
        }),
        items: this.formBuilder.group({
          shippingMethod: ['', Validators.required]
        }),
      });
     }

  ngOnInit(): void {
    this.cartService.allCartItems.subscribe(r=>{
      this.cartItems=r;
    });
    if(this.accountService.userValue.shipping_address_id){
      this.currentStep=2;
      const url = `/api/shipping/${this.accountService.userValue.shipping_address_id}/`;
      this.http.get<ShippingAddress>(url).subscribe((r:ShippingAddress)=>{
        if(r)this.onboardingForm.get(['shipping'])!.patchValue(r);
      });
    }
    if(this.accountService.userValue.payment_method_id){
      this.currentStep=3;
      const url = `/api/payment/${this.accountService.userValue.payment_method_id}/`;
      this.http.get<PaymentMethod>(url).subscribe((r:PaymentMethod)=>{
        r['cvv']=String(r['cvv']);
        r['creditCardNumber']=String(r['creditCardNumber']);
        if(r)this.onboardingForm.get(['payment'])!.patchValue(r);
      });
    }
  }

  get f() { return this.onboardingForm.controls; }
  get fv() { return this.onboardingForm.value; }

  nextStep(){
    this.submitted=true;
    if(this.currentStep==1 && !this.f['shipping'].valid)return;
    this.currentStep++;
    this.submitted=false;
  }

  prevStep(){
    this.currentStep--;
  }


  placeOrder(){
    this.submitted=true;
    if(!this.f['items'].valid)return;
    console.log("onboardingForm");
    console.log(this.onboardingForm.value);
    const userId=Number(this.accountService.userValue.id);
    
    this.orderService.createByUser(this.fv,this.cartItems).subscribe(r=>{
      this.accountService.getById(userId).subscribe((data:any)=>{
        this.accountService.saveAndEmit(data);
      });
      this.submitted=false;
      this.alertService.success(`Order has been created!`, { keepAfterRouteChange: true });
      this.router.navigate(['/default/orders']);
    });
  }

  calculateTotal(){
    return this.cartService.calculateTotal();
  }

}
