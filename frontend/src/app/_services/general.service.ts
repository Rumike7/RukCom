import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class GeneralService {

  constructor() { }

  stars: number[] = [1, 2, 3, 4, 5];

  starClass(r: number|undefined, star: number): string {
    const rating=Number(r);
    if (rating! >= star) {
      return ' fa-star';
    } 
    else if (rating! + 0.5 >= star) {
      return 'fa fa-star-half';
    } else {
      return 'far fa-star';
    }
  }
}
