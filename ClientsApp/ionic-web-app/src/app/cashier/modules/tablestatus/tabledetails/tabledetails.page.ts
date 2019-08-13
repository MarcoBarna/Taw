import { Component, OnInit } from '@angular/core';
import { TablestatusPage } from '../tablestatus.page';
import { ActivatedRoute } from '@angular/router';
import { UserHttpService } from 'src/app/services/user-http.service';
import { TableHttpService } from 'src/app/services/table-http.service';
import { OrderHttpService } from 'src/app/services/order-http.service';
import { Tables } from '../../../../models/Tables';
import { Orders } from '../../../../models/Orders';
import { MenuController } from '@ionic/angular';

@Component({
  selector: 'app-tabledetails',
  templateUrl: './tabledetails.page.html',
  styleUrls: ['./tabledetails.page.scss'],
})
export class TabledetailsPage implements OnInit {

  loadedTable: Tables[];
  loadedOrder: Orders[];
  // tslint:disable-next-line: no-shadowed-variable
  constructor(private ActivatedRoute: ActivatedRoute,
              public menuCtrl: MenuController,
              private table: TableHttpService,
              private us: UserHttpService,
              private ord: OrderHttpService) {
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
        // tslint:disable-next-line: no-string-literal
        console.log(this.loadedTable['orderId']);
        this.ord.getOrder(this.loadedTable['orderId']).subscribe(val => {
          this.loadedOrder = val;
          console.log(this.loadedOrder);
        });
      });

    });
  }

}
