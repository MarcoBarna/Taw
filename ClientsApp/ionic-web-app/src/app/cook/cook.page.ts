import { Component, OnInit } from '@angular/core';
import { UserHttpService } from '../services/user-http.service';
import { TableHttpService } from '../services/table-http.service';
import { MenuController } from '@ionic/angular';
import { Router } from '@angular/router';
import { OrderHttpService } from '../services/order-http.service';
import { Orders } from '../models/Orders';
import { SocketioService } from '../services/socketio.service';

@Component({
  selector: 'app-cook',
  templateUrl: './cook.page.html',
  styleUrls: ['./cook.page.scss']
})
export class CookPage implements OnInit {
  loadedOrder: Orders[];

  constructor(
    private us: UserHttpService,
    private router: Router,
    private menuCRTL: MenuController,
    private table: TableHttpService,
    private ord: OrderHttpService,
    private socketio: SocketioService
  ) {
    this.menuCRTL.enable(false);
    this.getOrders();
  }
  removeItem(index: number) {
    this.loadedOrder.splice(index, 1);
  }
  getOrders() {
    const date = new Date();
    const dateStr =
      date.getDate() +
      ((date.getMonth() < 10 ? '0' : '') + `${date.getMonth() + 1}`) +
      date.getFullYear();
    console.log(dateStr);
    this.ord
      .getTicketsByDate(parseInt(dateStr, 10))
      .toPromise()
      .then(order => {
        this.loadedOrder = order;
        this.loadedOrder.sort((order1: Orders, order2: Orders) => {
          return (
            (order1.orderNumber % 1000000) - (order2.orderNumber % 1000000)
          );
        });
        console.log(this.loadedOrder);
      })
      .catch(err => {
        console.log(err);
      });
  }

  ngOnInit() {
    if (
      this.us.get_token() === undefined ||
      this.us.get_token() === '' ||
      this.us.get_role() !== 3
    ) {
      console.log('Acces Denided');
      this.us.logout();
    }
  }
}
