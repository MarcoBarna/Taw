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
  styleUrls: ['./ticket.page.scss'],
})
export class TicketPage implements OnInit {

  loadedOrder;
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
    this.getOrders(1);
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
      })
      .catch(err => {
        console.log(err);
      });
  }

  ngOnInit() {
    if (this.us.get_token() === undefined || this.us.get_token() === '' || this.us.get_role() !== 1) {
      console.log('Acces Denided');
      this.us.logout();
    }
  }

}
