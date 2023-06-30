import { AccountService } from 'src/app/_services/account.service';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { CartItem, Order } from '@app/_interfaces/product.interface';

@Injectable({
  providedIn: 'root'
})
export class OrderService {

  private apiUserUrl ;
  private apiUrl ;
  allOrders:Order[]=[];
  userId: number;
  selectedOrder=new BehaviorSubject<Order|undefined>(undefined);


  constructor(
    private http: HttpClient,
    private account: AccountService,
    ) {
      this.userId=Number(this.account.userValue.id);
      this.apiUserUrl = `api/${this.userId}/orders`;
      this.apiUrl = `api/orders`;
  }

  getAllByUser(){
    return this.http.get<Order[]>(this.apiUserUrl);
  }
  getByUser(id:number){
    const url = `${this.apiUserUrl}/${id}`;
    return this.http.get<Order>(url);
  }

  createByUser(onboardingForm: any, items:CartItem[]): Observable<Order> {
    return this.http.post<any>(this.apiUserUrl, {data:onboardingForm,items:items});
  }

  updateByUser(order: any,id:number): Observable<Order> {
    const url = `${this.apiUserUrl}/${id}`;
    return this.http.put<any>(url, order);
  }

  deleteByUser(id: number): Observable<any> {
    const url = `${this.apiUserUrl}/${id}`;
    return this.http.delete(url);
  }
  getAll(){
    return this.http.get<Order[]>(this.apiUrl);
  }
  get(id:number){
    const url = `${this.apiUrl}/${id}`;
    return this.http.get<Order>(url);
  }

  create(onboardingForm: any, items:CartItem[]): Observable<Order> {
    return this.http.post<any>(this.apiUrl, {data:onboardingForm,items:items});
  }

  update(order: any,id:number): Observable<Order> {
    const url = `${this.apiUrl}/${id}`;
    return this.http.put<any>(url, order);
  }

  delete(id: number): Observable<any> {
    const url = `${this.apiUrl}/${id}`;
    return this.http.delete(url);
  }
  selectOrder(order:Order){

    this.selectedOrder.next(order);
  }
}
