import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { MenuController } from '@ionic/angular';
import { UserHttpService } from 'src/app/services/user-http.service';
import { SocketioService } from 'src/app/services/socketio.service';
import { OrderHttpService } from 'src/app/services/order-http.service';
import { TableHttpService } from 'src/app/services/table-http.service';
import { Orders } from 'src/app/models/Orders';
import { Items } from 'src/app/models/Items';
import { ItemHttpService } from 'src/app/services/item-http.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-kitchen-details',
  templateUrl: './kitchen-details.page.html',
  styleUrls: ['./kitchen-details.page.scss'],
})
export class KitchenDetailsPage implements OnInit {

  orderID;
  loadedOrder: Orders;
  loadedArrayOrder;
  loadedArrayOrderBev;
  loadedItemsArray = new Array<Items>();
  loadedItemsArrayBev = new Array<Items>();
  loadname;

  constructor(
    private us: UserHttpService,
    // tslint:disable-next-line: no-shadowed-variable
    private ActivatedRoute: ActivatedRoute,
    private router: Router,
    public menuCRTL: MenuController,
    private table: TableHttpService,
    private ord: OrderHttpService,
    private socketio: SocketioService,
    private itm: ItemHttpService,
    private toast: ToastrService
  ) {
    this.menuCRTL.enable(true);
    this.AcRoute();
    this.socketio.get().on('Cashier', () => {
      this.AcRoute();
    });
  }

  CheckColorStatus(value: number) {
    switch (value) {
      case 1:
        return 'warning';
      case 2:
        return 'success';
      case 0:
        return 'danger';
    }
  }

  CheckColorStatusBev(value: boolean) {
    switch (value) {
      case false:
        return 'danger';
      case true:
        return 'success';
    }
  }

  AcRoute() {
    this.ActivatedRoute.paramMap.subscribe(paramMap => {
      if (!paramMap.has('orderID')) {
        // redirect
        return;
      }
      this.orderID = paramMap.get('orderID');
      console.log(this.orderID);
      this.ord
        .getOrder(parseInt(this.orderID, 10))
        .toPromise()
        .then(order => {
          this.loadedOrder = order;
          console.log(this.loadedOrder);
          this.loadedArrayOrder = this.loadedOrder.dishList;
          this.loadedArrayOrderBev = this.loadedOrder.beverageList;
          console.log(this.loadedArrayOrder);
          this.itm
            .getItems()
            .toPromise()
            .then((it: Items[]) => {
              this.loadname = it;
              it.sort((itm1: Items, itm2: Items) => {
                return itm2.requiredTime - itm1.requiredTime;
              });
              this.loadedItemsArray = [];
              this.loadedItemsArrayBev = [];
              this.loadname.forEach(element => {
                this.loadedArrayOrder.forEach(code => {
                  if (element.code === code) {
                    this.loadedItemsArray.push(element);
                  }
                });
                this.loadedArrayOrderBev.forEach(code => {
                  if (element.code === code) {
                    this.loadedItemsArrayBev.push(element);
                  }
                });
              });
              console.log(this.loadedItemsArray);
            })
            .catch(err => {
              console.log(err);
            });
        })
        .catch(err => {
          console.log(err);
        });
    });
  }
  ngOnInit() {
    if (
      this.us.get_token() === undefined ||
      this.us.get_token() === '' ||
      this.us.get_role() !== 1
    ) {
      console.log('Acces Denided');
      this.us.logout();
    }
  }

}
