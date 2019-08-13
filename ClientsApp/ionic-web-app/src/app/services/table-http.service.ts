import { Injectable } from '@angular/core';
import { UserHttpService } from './user-http.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Tables } from '../models/Tables';
import { map } from 'rxjs/operators';
@Injectable({
  providedIn: 'root'
})
export class TableHttpService {

  public endpoint = 'tables';

  constructor(private us: UserHttpService, private http: HttpClient) {}

  getTables() {
    return this.http.get<Tables[]>(this.endpoint);
  }
  getSingleTable(tableId){
    return this.http.get<Tables[]>(this.endpoint + '/' + tableId);
  }

  changeTableStatus(tableId, orderId) {
    return this.http.patch<Tables>(this.endpoint + '/' + tableId, {orderId});
  }

  addTable(tableNumber: number, seats: number) {
    return this.http.post<Tables>(this.endpoint, {tableNumber, seats});
  }

  deleteTable(tableNumber: number) {
    console.log(`Table number ${tableNumber} has been deleated`);
    return this.http.delete(this.endpoint + '/' + tableNumber);
  }

}
