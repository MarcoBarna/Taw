import { Component, OnInit } from '@angular/core';
import { UserHttpService } from '../services/user-http.service';
import { Router } from '@angular/router';
import { MenuController } from '@ionic/angular';
import { TableHttpService } from '../services/table-http.service';
import { OrderHttpService } from '../services/order-http.service';
import { SocketioService } from '../services/socketio.service';
import { Orders } from '../models/Orders';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-bartender',
  templateUrl: './bartender.page.html',
  styleUrls: ['./bartender.page.scss'],
})
export class BartenderPage implements OnInit {

  loadedOrder: Orders[];
  constructor(
    private us: UserHttpService,
    private menuCRTL: MenuController,
    private ord: OrderHttpService,
    private socketio: SocketioService,
    private toast: ToastrService
  ) {
    this.menuCRTL.enable(false);
    this.getOrders(0);
    this.socketio.get().on('Bartender', () => {
      this.getOrders(0);
    });
    this.socketio.get().on('Order Added', () => {
      this.getOrders(0);
      this.toast.info('New order added');
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
    console.log(dateStr);
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
      this.us.get_role() !== 4
    ) {
      console.log('Acces Denided');
      this.us.logout();
    }
  }

}
