import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AccountService } from './account.service';
import { Rating } from '@app/_interfaces/product.interface';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class RatingService {
  private apiUrl ;

  constructor(
    private http: HttpClient,
  ) { this.apiUrl = `api/ratings`;}

  getAll(){
    return this.http.get<Rating[]>(this.apiUrl);
  }
  get(id:number){
    const url = `${this.apiUrl}/${id}`;
    return this.http.get<Rating>(url);
  }

  create(rating: Rating): Observable<Rating> {
    return this.http.post<any>(this.apiUrl, rating);
  }

  update(rating: Rating,id:number): Observable<Rating> {
    const url = `${this.apiUrl}/${id}`;
    return this.http.put<any>(url, rating);
  }

  delete(id: number): Observable<any> {
    const url = `${this.apiUrl}/${id}`;
    return this.http.delete(url);
  }

  rated(user_id:number,product_id:number): Observable<number> {
    const url=`/api/rated/${user_id}/${product_id}`;
    return this.http.get(url) as Observable<number>;
  }
  ratingsProducts(product_id:number): Observable<number> {
    const url=`/api/ratings/products/${product_id}`;
    return this.http.get(url) as Observable<number>;
  }
  ratingsOrders(user_id:number,order_id:number): Observable<number> {
    const url=`/api/ratings/orders/${user_id}/${order_id}`;
    return this.http.get(url) as Observable<number>;
  }
}
