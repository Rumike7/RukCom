import { Injectable } from '@angular/core';
import { DecimalPipe } from '@angular/common';
import { Driver, Truck } from '../interfaces/drivers.interface';
import { User } from '../interfaces/user.interface';

@Injectable({
  providedIn: 'root',
})
export class ValidateFormService {
  error!: string;
  
  constructor(private decimalPipe: DecimalPipe) {
  }

  notvalidateDriver(driver: Driver):string {
    // if(driver.status=="Quel est vôtre statut?"){
    //   return "Veuillez choisir un status";
    // }
    // else if(JSON.stringify(driver.entreprise)==JSON.stringify({})
    // && JSON.stringify(driver.particular)==JSON.stringify({})){
    //     return "Les informations concernant votre status vont vides"
    // }
    return "";
  }
  notvalidateTruck(truck: Truck):string {
    return "";
  }
  notvalidateUser(user: User):string {
    return "";
  }
  showError(error:string){
    this.error=error;
    $("#error").css({"display":"block"})
  }
}