import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MenuController } from '@ionic/angular';
import { UserHttpService } from 'src/app/services/user-http.service';
import { ItemHttpService } from 'src/app/services/item-http.service';
import { SocketioService } from 'src/app/services/socketio.service';
import { OrderHttpService } from 'src/app/services/order-http.service';
import { TableHttpService } from 'src/app/services/table-http.service';
import { Orders } from 'src/app/models/Orders';

@Component({
  selector: 'app-ticket',
  templateUrl: './ticket.page.html',
  styleUrls: ['./ticket.page.scss']
})
export class TicketPage implements OnInit {
  loadedOrder;
  loadedOrdersTotal;
  arrayOfTicketsIds: number[];
  arrayofTotals: number[];
  totalDay: number;

  constructor(
    private us: UserHttpService,
    private router: Router,
    public menuCRTL: MenuController,
    private table: TableHttpService,
    private ord: OrderHttpService,
    private socketio: SocketioService,
    private itm: ItemHttpService
  ) {
    this.menuCRTL.enable(true);
    this.totalDay = 0;
    this.getOrders(1);
    this.getTotal(2);
    this.socketio.get().on('Cashier', () => {
      this.getOrders(1);
      this.getTotal(2);
      console.log('Cashier event recevied');
    });
  }

  removeItem(index: number) {
    this.loadedOrder.splice(index, 1);
  }

  getOrders(type: number) {
    const date = new Date();
    const dateStr =
      date.getDate() +
      ((date.getMonth() < 10 ? '0' : '') + `${date.getMonth() + 1}`) +
      date.getFullYear();
    this.ord
      .getTicketsByDate(parseInt(dateStr, 10), type)
      .toPromise()
      .then(order => {
        this.loadedOrder = order;
        this.loadedOrder.sort((order1: Orders, order2: Orders) => {
          return (
            (order1.orderNumber % 1000000) - (order2.orderNumber % 1000000)
          );
        });
      })
      .catch(err => {
        console.log(err);
      });
  }

  getTotal(type: number) {
    const date = new Date();
    const dateStr =
      date.getDate() +
      ((date.getMonth() < 10 ? '0' : '') + `${date.getMonth() + 1}`) +
      date.getFullYear();
    this.ord
      .getTicketsByDate(parseInt(dateStr, 10), type)
      .toPromise()
      .then(order => {
        this.loadedOrdersTotal = order;
        this.loadedOrdersTotal.sort((order1: Orders, order2: Orders) => {
          return (
            (order1.orderNumber % 1000000) - (order2.orderNumber % 1000000)
          );
        });
        this.arrayOfTicketsIds = [];
        console.log(this.loadedOrdersTotal);
        this.loadedOrdersTotal.forEach(element => {
          this.arrayOfTicketsIds.push(element.orderNumber);
        });
        this.totalDay = 9999;
        const arrayOfPromise = [];
        this.arrayOfTicketsIds.forEach(element => {
          arrayOfPromise.push(
            this.ord
              .getTicket(element)
              .toPromise()
              .then()
          );
          console.log(arrayOfPromise);
        });
        this.totalDay = 0;
        Promise.all(arrayOfPromise).then(values => {
          this.arrayofTotals = values;
          console.log(this.arrayofTotals);
          this.arrayofTotals.forEach(element => {
            this.totalDay += element;
          });
          console.log(this.totalDay);
        });
      })
      .catch(err => {
        console.log(err);
      });
  }

  ngOnInit() {
    if (
      this.us.get_token() === undefined ||
      this.us.get_token() === '' ||
      this.us.get_role() !== 1
    ) {
      console.log('Acces Denided');
      this.us.logout();
    }
  }
}
