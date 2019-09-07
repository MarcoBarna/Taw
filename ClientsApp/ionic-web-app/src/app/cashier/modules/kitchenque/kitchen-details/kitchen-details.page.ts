import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MenuController } from '@ionic/angular';
import { UserHttpService } from 'src/app/services/user-http.service';
import { SocketioService } from 'src/app/services/socketio.service';
import { OrderHttpService } from 'src/app/services/order-http.service';
import { TableHttpService } from 'src/app/services/table-http.service';
import { Orders } from 'src/app/models/Orders';

@Component({
  selector: 'app-kitchen-details',
  templateUrl: './kitchen-details.page.html',
  styleUrls: ['./kitchen-details.page.scss'],
})
export class KitchenDetailsPage implements OnInit {

  constructor(
    private us: UserHttpService,
    private router: Router,
    private menuCRTL: MenuController,
    private table: TableHttpService,
    private ord: OrderHttpService,
    private socketio: SocketioService
  ) {
    this.menuCRTL.enable(true);
  }

  ngOnInit() {
  }

}
