import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { UserHttpService } from 'src/app/services/user-http.service';
import { TableHttpService } from 'src/app/services/table-http.service';
import { OrderHttpService } from 'src/app/services/order-http.service';
import { Tables } from '../../../models/Tables';
import { Orders } from '../../../models/Orders';
import { MenuController } from '@ionic/angular';
import { ItemHttpService } from 'src/app/services/item-http.service';
import { Items } from 'src/app/models/Items';
import { element } from 'protractor';
import { ToastrService } from 'ngx-toastr';
import { SocketioService } from 'src/app/services/socketio.service';

@Component({
  selector: 'app-waiter-order',
  templateUrl: './waiter-order.page.html',
  styleUrls: ['./waiter-order.page.scss']
})
export class WaiterOrderPage implements OnInit {
  private role;
  private nick;
  loadedTable: Tables[];
  tableID: number;

  constructor(
    // tslint:disable-next-line: no-shadowed-variable
    private ActivatedRoute: ActivatedRoute,
    private table: TableHttpService,
    public menuCtrl: MenuController,
    private us: UserHttpService,
    private ord: OrderHttpService,
    private itm: ItemHttpService,
    private router: Router,
    private socket: SocketioService,
    private toast: ToastrService
  ) {
    this.menuCtrl.enable(false);
    this.nick = this.us.get_nick();
    this.role = this.us.get_role();
    this.socket.get().on('Dishes Ready', (data) => {
      const nick = this.us.get_nick();
      const usr = data.username;
      const table = data.table;
      console.log(nick);
      console.log(usr);
      if( nick === usr) {
        this.toast.info('Dishes Ready table: ' + table);
      }
    });
    this.socket.get().on('Beverages Ready', (data) => {
      const nick = this.us.get_nick();
      const usr = data.username;
      const table = data.table;
      console.log(nick);
      console.log(usr);
      if( nick === usr) {
        this.toast.info('Beverages Ready table: ' + table);
      }
    });
  }

  sendOrder(nPeople: number, dishStr, beverageStr) {
    const arrayOutDish = dishStr.split(' ').map(item => {
      return parseInt(item, 10);
    });

    const arrayOutBev = beverageStr.split(' ').map(item => {
      return parseInt(item, 10);
    });
    const date = new Date();

    const value =
      `${this.tableID}` +
      date.getDate() +
      date.getMonth() +
      date.getFullYear() +
      (date.getHours() < 10 ? '0' : '') +
      date.getHours() +
      (date.getMinutes() < 10 ? '0' : '') +
      date.getMinutes() +
      (date.getSeconds() < 10 ? '0' : '') +
      date.getSeconds();
    this.ord.addOrder(parseInt(value, 10), arrayOutBev, arrayOutDish, nPeople, this.tableID, this.nick)
      .toPromise()
      .then(or => {
        console.log(or);
      })
      .catch(err => {
        console.log(err);
      });
    this.table
      .changeTableStatus(this.tableID, parseInt(value, 10))
      .toPromise()
      .then(tb => {
        console.log(tb);
      })
      .catch(err => {
        console.log(err);
      });
    this.router.navigate(['waiter']);
  }

  ngOnInit() {
    if (
      this.us.get_token() === undefined ||
      this.us.get_token() === '' ||
      this.us.get_role() !== 2
    ) {
      console.log('Acces Denided');
      this.us.logout();
    }
    this.ActivatedRoute.paramMap.subscribe(paramMap => {
      if (!paramMap.has('tableId')) {
        // redirect
        return;
      }
      this.tableID = parseInt(paramMap.get('tableId'), 10);
      this.table
        .getSingleTable(this.tableID)
        .toPromise()
        .then(tab => {
          this.loadedTable = tab;
          this.ord
            .getOrders()
            .toPromise()
            .then(orders => {
              console.log(orders);
            });
        });
    });
  }
}
