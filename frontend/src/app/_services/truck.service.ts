import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { DataSearch } from 'src/app/interfaces/data-search';
import { Driver, Truck } from 'src/app/interfaces/drivers.interface';
import { Observable} from 'rxjs';
import { Infos } from 'src/app/interfaces/info.interface';

@Injectable({
  providedIn: 'root'
})
export class TruckService {
  readonly ROOT_URL = "http://getway/backend/public/api";
  constructor(private http: HttpClient) { }
  getTrucks(driver: Driver): Observable<any> {
    console.log("data:"+JSON.stringify(driver));
    return this.http.post<Truck[]>(this.ROOT_URL+"/driver/getTruck",JSON.stringify(driver));
  }
  postTruck(truck: Truck): Observable<any>{
    console.log(JSON.stringify(truck));
    return this.http.post<Infos>(this.ROOT_URL+"/truck/add",JSON.stringify(truck));
  }

  
}
