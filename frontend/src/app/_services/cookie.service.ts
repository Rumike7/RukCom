import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Driver } from 'src/app/interfaces/drivers.interface';
import { Infos } from '../interfaces/info.interface';
import { DriverService } from './driver.service';

@Injectable()
export class CookieService {
  readonly ROOT_URL = "http://getway/backend/public/api";
  hascookie=false;
  valueCookie="";
  constructor(private http:HttpClient) {}
  testCookie(){
    this.http.get<Infos>(this.ROOT_URL+"/driver/cookie/has")
        .subscribe((d:Infos)=>{
            if(d.testCookie){
                this.hascookie=true;
                this.getCookie().subscribe((d:Infos)=>{
                    this.valueCookie=d.valueCookie;
                });
            }
            else{this.hascookie=false;}
        }); 
  }
  getCookie(){
    return this.http.get<Infos>(this.ROOT_URL+"/driver/cookie/get"); 
  }

}