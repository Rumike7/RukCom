import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { DataSearch } from '../interfaces/data-search';

@Injectable()
export class DataSearchService {

  private dataSubject:BehaviorSubject<DataSearch>=new BehaviorSubject<DataSearch>(<DataSearch>{});
  dataCurrent = this.dataSubject.asObservable();

  constructor() { }

  emit(data: DataSearch) {
    this.dataSubject.next(data);
  }

}