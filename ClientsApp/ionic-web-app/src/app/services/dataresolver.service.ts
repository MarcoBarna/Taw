import { Injectable } from '@angular/core';
import { DataService } from './data.service';
import { ActivatedRouteSnapshot } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class DataresolverService {
  private data = [];

  constructor(private dataService: DataService) { }

  resolve(route: ActivatedRouteSnapshot) {
    const id = route.paramMap.get('id');
    return this.dataService.getData(id);
  }
}
