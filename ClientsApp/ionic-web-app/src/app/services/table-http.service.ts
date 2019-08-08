import { Injectable } from '@angular/core';
import { UserHttpService } from './user-http.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Tables } from '../models/Tables';
@Injectable({
  providedIn: 'root'
})
export class TableHttpService {

  public endpoint = 'tables';

  constructor(private us: UserHttpService, private httpCl: HttpClient) {}

  getTables(){
    return this.httpCl.get<Tables[]>(this.endpoint);
  }

  changeTableStatus(tableId){
    return this.httpCl.patch<Tables>(this.endpoint + '/' + tableId.number, tableId);
  }
  
  addTable(tableNumber: number, seats: number){
    return this.httpCl.post<Tables>(this.endpoint, {tableNumber:tableNumber, seats:seats});
  }

  deleteTable(tableNumber: number){
    console.log(`Table number ${tableNumber} has been deleated`);
    return this.httpCl.delete(this.endpoint + '/' + tableNumber);
  }

}
