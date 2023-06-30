import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable, lastValueFrom } from 'rxjs';
import { Product } from '@app/_interfaces/product.interface';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  private apiUrl = '/api/products'; // replace with your Laravel API endpoint
  allProducts=new BehaviorSubject<Product[]>([]);
  fildtredProducts=new BehaviorSubject<Product[]>([]);
  constructor(private http: HttpClient) {
    this.gets().subscribe((res:Product[]) => {
      console.log(res);
      this.allProducts.next(res);
      this.fildtredProducts.next(res);
    });
  }

  gets(){
    return this.http.get<Product[]>(this.apiUrl);
  }

  getAll(){
    return this.http.get<Product[]>(this.apiUrl).subscribe((res:Product[]) => {
      console.log(res);
      this.allProducts.next(res);
    });
  }

  get(id: number): Observable<Product> {
    const url = `${this.apiUrl}/${id}`;
    return this.http.get<Product>(url);
  }

  getWithKeys(keys: string){
    const url = `${this.apiUrl}/search/${keys}`;
    return this.http.get(url).subscribe(res=>{
      var r:any=res;//["products"=>products]
      console.log("getWithKeys");
      console.log(r);
      this.fildtredProducts.next(r.products);
    });
  }

  create(product: any): Observable<Product> {
    console.log({product});
    return this.http.post<any>(this.apiUrl, product);
  }
  
  update(product: any,id:number): Observable<Product> {
    const url = `${this.apiUrl}/${id}`;
    return this.http.put<any>(url, product);
  }

  delete(id: number): Observable<any> {
    const url = `${this.apiUrl}/${id}`;
    return this.http.delete(url);
  }

  async setImage(imgpath:string){
    const blob= await lastValueFrom(this.http.get(imgpath, { responseType: 'blob' }));
    const name=String(imgpath.split('\\').pop()?.split('/').pop());
    const file = new File([blob], name, { type: 'image/jpeg' });
    return file;
  }
}
