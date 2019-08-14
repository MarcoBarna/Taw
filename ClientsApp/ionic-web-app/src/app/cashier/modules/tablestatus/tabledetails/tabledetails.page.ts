import { Component, OnInit } from '@angular/core';
import { TablestatusPage } from '../tablestatus.page';
import { ActivatedRoute } from '@angular/router';
import { UserHttpService } from 'src/app/services/user-http.service';
import { TableHttpService } from 'src/app/services/table-http.service';
import { OrderHttpService } from 'src/app/services/order-http.service';
import { Tables } from '../../../../models/Tables';
import { Orders } from '../../../../models/Orders';
import { MenuController } from '@ionic/angular';
import { ItemHttpService } from 'src/app/services/item-http.service';
import { Items } from 'src/app/models/Items';

@Component({
  selector: 'app-tabledetails',
  templateUrl: './tabledetails.page.html',
  styleUrls: ['./tabledetails.page.scss']
})
export class TabledetailsPage implements OnInit {
  loadedTable: Tables[];
  loadedOrder: Orders[];
  loadItems: Items[];
  loadDish;
  loadBev;
  loadname;
  // tslint:disable-next-line: no-shadowed-variable
  constructor(
    private ActivatedRoute: ActivatedRoute,
    public menuCtrl: MenuController,
    private table: TableHttpService,
    private us: UserHttpService,
    private ord: OrderHttpService,
    private itm: ItemHttpService
  ) {
    this.menuCtrl.enable(true);
  }

  ngOnInit() {
    this.ActivatedRoute.paramMap.subscribe(paramMap => {
      if (!paramMap.has('tableId')) {
        // redirect
        return;
      }
      const tableId = paramMap.get('tableId');
      this.table.getSingleTable(parseInt(tableId, 10)).subscribe(res => {
        this.loadedTable = res;
        this.ord.getOrder(this.loadedTable['orderId']).subscribe(val => {
          this.loadedOrder = val;
          console.log(this.loadedOrder); 
          this.loadDish = Object.values(this.loadedOrder['dishList']);
          this.loadBev = Object.values(this.loadedOrder['beverageList']);
          this.itm.getItems().subscribe(itmdish => {
            this.loadname = itmdish;
            console.log(this.loadname);
          })
        });
      });
    });
  }
}
