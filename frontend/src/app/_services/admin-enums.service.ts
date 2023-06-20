import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AlertService } from './alert.service';

@Injectable({
  providedIn: 'root'
})
export class AdminEnumsService {
  private apiUrl = '/api/adminenums';
  brands: string[]=[];
  categories: string[]=[];
   
  constructor(
    private http: HttpClient,
    private alertService: AlertService,
  ) {
    this.get().subscribe((data:any) => {
      console.log("GET adminEnumsService");
      console.log({data});
      if(data.brands)this.brands=data.brands;
      if(data.categories)this.categories=data.categories ;      
    })
  }
  get(){
    const url = `${this.apiUrl}/${1}`;
    return this.http.get<any>(url);
  }
  update(dataarray: string[],type:number) {
    const url = `${this.apiUrl}/${type}`;
    //0 brands
    //1 categories
    return this.http.put<any>(url, {dataarray}).subscribe({
      next: (res) => {
         console.log(res);          
      },
      error: error => {
          this.alertService.error(error);
      }
  });
  }
}
