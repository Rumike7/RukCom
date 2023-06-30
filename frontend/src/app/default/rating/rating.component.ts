import { Component, Input, OnInit, ChangeDetectorRef} from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CartItem, Order, Product, Rating } from '@app/_interfaces/product.interface';
import { AccountService } from '@app/_services/account.service';
import { AlertService } from '@app/_services/alert.service';
import { GeneralService } from '@app/_services/general.service';
import { OrderService } from '@app/_services/order.service';
import { RatingService } from '@app/_services/rating.service';

@Component({
  selector: 'app-rating',
  templateUrl: './rating.component.html',
  styleUrls: ['./rating.component.scss']
})
export class RatingComponent implements OnInit {

  ratingForm!: FormGroup;
  order!:Order;
  currentStep: number = 0;
  currentItem!: CartItem|undefined;
  currentRating: number = 0;
  currentComment: string = '';
  orderRate:number=0;


  constructor(
    private formBuilder: FormBuilder,
    private orderService: OrderService,
    private ratingService: RatingService,
    public general:GeneralService,
    private accountService: AccountService,
    private alertService: AlertService,
    private changeDetectorRef: ChangeDetectorRef
    ) {}

  ngOnInit() {
    this.ratingForm = this.formBuilder.group({
      ratings: this.formBuilder.array([])
    });
    this.orderService.selectedOrder.subscribe(order=>{
      if(order){
          this.order=order;
          this.currentItem=this.order.items[this.currentStep];
          for(let i of this.order.items.slice().reverse()){//to get currentRating
            this.addRatingControl(i.product);
          }
        }
    })
  }

  get ratings() {
    return (this.ratingForm.get('ratings') as FormArray);
  }
  get ratingControls2() {
    return (this.ratingForm.controls['ratings'] as FormArray).controls;
  }

  addRatingControl(product:Product) {
    this.ratingService.rated(Number(this.accountService.userValue.id),product.id).subscribe(ratedId =>{
      const ratingControl = this.formBuilder.group({
        rating: [0],
        comment: ['']
      });
      console.log({ratedId})
      if(ratedId!=-1){
        this.ratingService.get(ratedId).subscribe(rating =>{
          console.log({rating});
          const rControl = ratingControl.get('rating');
          const cControl = ratingControl.get('comment');
          if(rControl && rating.rating){
            rControl.setValue(rating.rating);
            this.currentRating=Number(rating.rating);
          }
          if(cControl && rating.comment)cControl.setValue(rating.comment);
        });

      }
      this.ratings.push(ratingControl);
    });
  }


  setRating(rating: number) {
    const ratingControl = this.ratings.controls[this.currentStep].get('rating');
    if(ratingControl){
      ratingControl.setValue(rating);
      this.currentRating = ratingControl.value;
    }

    this.changeDetectorRef.detectChanges();

  }
  setComment() {
    const commentControl = this.ratings.controls[this.currentStep].get('comment');
    if(commentControl){
      console.log( this.currentStep);
      console.log( commentControl.value);
      console.log( this.currentComment);
      this.currentComment =commentControl.value;

    }

    this.changeDetectorRef.detectChanges();
  }

  prevStep() {
    if (this.currentStep > 0) {
      this.currentStep--;
      this.currentItem=this.order.items[this.currentStep];
      const ratingControl = this.ratings.controls[this.currentStep].get('rating');
      if(ratingControl) this.currentRating = ratingControl.value;
      // this.setComment();
    }
  }

  nextStep() {
    if (this.currentStep < this.ratings.length - 1) {
        if (this.ratingControls2[this.currentStep].valid) {
        const commentControl = this.ratings.controls[this.currentStep].get('comment');
        commentControl?.setValue(this.currentComment);
        this.currentStep++;
        this.currentItem=this.order.items[this.currentStep];
        const ratingControl = this.ratings.controls[this.currentStep].get('rating');
        if(ratingControl)this.currentRating = ratingControl.value;
        const commentControl2 = this.ratings.controls[this.currentStep].get('comment');
        this.currentComment=commentControl2?.value;
        }
      } else if(this.currentStep == this.ratings.length -1){
        //Verification
        this.currentStep++;
      }else{
        console.log("SUBMIT");
        console.log(this.ratings.value);
        this.orderRate=0;
        for(let i=0;i< this.ratings.controls.length;i++){
          const rating:Rating ={
            'user_id': Number(this.accountService.userValue.id),
            'product_id': this.order.items[i].product.id,
            'rating': this.ratings.controls[i].get('rating')!.value,
            'comment': this.ratings.controls[i].get('comment')!.value
          }
          this.orderRate+=Number(this.ratings.controls[i].get('rating')!.value);

          this.ratingService.rated(Number(this.accountService.userValue.id),this.order.items[i].product.id).subscribe(ratedId =>{
            console.log({ratedId})
            if(ratedId!=-1){
              console.log("UPDATE");

              this.ratingService.update(rating,ratedId).subscribe(rating =>{
                console.log({rating});
                this.alertService.success("Thank for your rating!");
              });
            }else{
              console.log("CREATE");
              this.ratingService.create(rating).subscribe(rating =>{
                console.log({rating})
              });
            }
            this.ratingService.ratingsProducts(Number(this.order.items[i].product.id)).subscribe(ratingsP=>{
              console.log({ratingsP});
            });
            
          });
        }
        this.ratingService.ratingsOrders(Number(this.accountService.userValue.id),Number(this.order.id)).subscribe(ratingsO =>{
          console.log({ratingsO});
          this.alertService.success("Thank for your rating!");
        });

      }
  }
}



