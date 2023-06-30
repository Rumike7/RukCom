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
  shuffle(a:any[]) {
    a.sort(() => Math.random() - 0.5);
    // var j, x, i;
    // for (i = a.length - 1; i > 0; i--) {
    //     j = Math.round(Math.random() * (i + 1));
    //     x = a[i];
    //     a[i] = a[j];
    //     a[j] = x;
    // }
    return a;
  }

  hideloader() {
    document.getElementById('loading')!.style.display = 'none';
  }
  showloader() {
    document.getElementById('loading')!.style.display = 'block';
  }

}
