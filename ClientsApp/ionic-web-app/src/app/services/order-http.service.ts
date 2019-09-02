import { Injectable } from '@angular/core';
import { UserHttpService } from './user-http.service';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { SendOrder } from '../models/SendOrder';
import { Orders } from '../models/Orders';
import { Tickets } from '../models/Tickets';

@Injectable({
  providedIn: 'root'
})
export class OrderHttpService {
  public endpoint = 'orders';

  constructor(private us: UserHttpService, private http: HttpClient) { }

  getOrders() {
    return this.http.get<Orders[]>(this.endpoint);
  }

  getOrder(orderID: number) {
    return this.http.get<Orders[]>(this.endpoint + '/' + orderID);
  }

  // Will return all the tickets of the given day
  getTicketsByDate(date: number) {
    return this.http.get<Orders[]>(this.endpoint + '/' + 'tickets' + '/' + 'day' + '/' + date);
  }

  /* will return the Total, an arraylist with all the beverages and dishes
  and finally another arraylist called Result which has all the info for printing
  */
  getTicket(orderID: number) {
    return this.http.get<Tickets[]>(this.endpoint + '/' + 'tickets' + orderID);
  }

  addOrder(orderNumb: number, blist: [number], dlist: [number], nPeople: number, tNumber: number, usrWaiter: string) {
    let sOrder: SendOrder;
    sOrder = {
      orderNumber: orderNumb,
      beverageList: blist,
      dishList: dlist,
      numberPeople: nPeople,
      tableNumber: tNumber,
      userNameWaiter: usrWaiter
    };
    return this.http.post(this.endpoint, sOrder);
  }

  addOrderClient(orderNumb: number, blist: [number], dlist: [number], nPeople: number, tNumber: number) {
    let sOrder: SendOrder;
    sOrder = {
      orderNumber: orderNumb,
      beverageList: blist,
      dishList: dlist,
      numberPeople: nPeople,
      tableNumber: tNumber,
      userNameWaiter: 'waiter'
    };
    return this.http.post(this.endpoint, sOrder);
  }

  modifyBevState(orderID: number) {
    return this.http.patch(this.endpoint + '/' + 'beverages' + '/' + orderID, {});
  }

  modifyDisState(orderID: number, index: number) {
    return this.http.patch(this.endpoint + '/' + 'dishes' + '/' + orderID, {index});
  }

  modifyOrderState(orderNumber: number) {
    return this.http.patch(this.endpoint, {orderNumber});
  }

  deleteOrder(orderID: number) {
    return this.http.delete(this.endpoint + '/' + orderID);
  }


}
