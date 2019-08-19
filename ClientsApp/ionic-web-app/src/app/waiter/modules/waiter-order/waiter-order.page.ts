import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { UserHttpService } from 'src/app/services/user-http.service';
import { TableHttpService } from 'src/app/services/table-http.service';
import { OrderHttpService } from 'src/app/services/order-http.service';
import { Tables } from '../../../models/Tables';
import { Orders } from '../../../models/Orders';
import { MenuController } from '@ionic/angular';
import { ItemHttpService } from 'src/app/services/item-http.service';
import { Items } from 'src/app/models/Items';

@Component({
  selector: 'app-waiter-order',
  templateUrl: './waiter-order.page.html',
  styleUrls: ['./waiter-order.page.scss'],
})
export class WaiterOrderPage implements OnInit {

  loadedTable;

  constructor(
    private ActivatedRoute: ActivatedRoute,
    private table: TableHttpService,
    public menuCtrl: MenuController,
    private us: UserHttpService,
    private ord: OrderHttpService,
    private itm: ItemHttpService
    ) {
      this.menuCtrl.enable(false);
     }

  ngOnInit() {
    this.ActivatedRoute.paramMap.toPromise().then(paramMap => {
      if (!paramMap.has('tableId')) {
        // redirect
        return;
      }
      const tableId = paramMap.get('tableId');
      console.log(tableId);
      this.table.getSingleTable(parseInt(tableId,10)).toPromise().then(tab => {
        this.loadedTable = tab;
        this.ord.getOrders().toPromise().then(orders => {
          console.log(orders);
        })

      });
    })
  }

}
