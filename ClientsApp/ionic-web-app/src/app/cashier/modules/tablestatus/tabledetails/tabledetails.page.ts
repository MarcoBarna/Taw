import { Component, OnInit } from '@angular/core';
import { TablestatusPage } from '../tablestatus.page';
import { ActivatedRoute } from '@angular/router';
import { UserHttpService } from 'src/app/services/user-http.service';
import { TableHttpService } from 'src/app/services/table-http.service';
import { OrderHttpService } from 'src/app/services/order-http.service';
import { Tables } from '../../../../models/Tables';

@Component({
  selector: 'app-tabledetails',
  templateUrl: './tabledetails.page.html',
  styleUrls: ['./tabledetails.page.scss'],
})
export class TabledetailsPage implements OnInit {

  loadedTable: Tables;
  // tslint:disable-next-line: no-shadowed-variable
  constructor(private ActivatedRoute: ActivatedRoute,
              private table: TableHttpService,
              private us: UserHttpService,
              private ord: OrderHttpService) { }

  ngOnInit() {
    this.ActivatedRoute.paramMap.subscribe(paramMap => {
      if (!paramMap.has('tableId')) {
        // redirect
        return;
      }
      const tableId = paramMap.get('tableId');
      this.loadedTable = this.table.getSingleTable(tableId);
    })
  }

}
