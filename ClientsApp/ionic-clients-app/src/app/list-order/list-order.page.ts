import { Component, OnInit } from '@angular/core';
import { TableHttpService } from '../services/table-http.service';
import { UserHttpService } from '../services/user-http.service';
import { Tables } from '../models/Tables';

@Component({
  selector: 'app-list-order',
  templateUrl: './list-order.page.html',
  styleUrls: ['./list-order.page.scss'],
})
export class ListOrderPage implements OnInit {

  listTables: Tables[];

  constructor(
    private table: TableHttpService,
    private us: UserHttpService
  ) {
    this.table.getTables().toPromise().then(
      tables => {
        this.listTables = tables;
      }
    )
  }

  ngOnInit() {
  }

}
