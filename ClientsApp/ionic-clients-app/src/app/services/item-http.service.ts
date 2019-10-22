import { Injectable } from '@angular/core';
import { UserHttpService } from './user-http.service';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Items } from '../models/Items';

@Injectable({
  providedIn: 'root'
})
export class ItemHttpService {

  public endpoint = 'items';
  constructor(private http: HttpClient) {}

  getItems() {
    return this.http.get<Items[]>(this.endpoint);
  }

  getSingleItem(code: number) {
    return this.http.get<Items[]>(this.endpoint + '/' + code);
  }

  addItem(code: number, name: string, requiredTime: number, price: number) {
    let item: Items;

    item = {
      code,
      name,
      requiredTime,
      price
    };

    return this.http.post(this.endpoint, item);
  }

  deleteItem(itemCodeID: number) {
    return this.http.delete(this.endpoint + '/' + itemCodeID);
  }
}

