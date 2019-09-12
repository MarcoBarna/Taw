import { Component, OnInit } from '@angular/core';
import { MenuController } from '@ionic/angular';
import { ActivatedRoute, Router } from '@angular/router';
import { TableHttpService } from 'src/app/services/table-http.service';
import { UserHttpService } from 'src/app/services/user-http.service';
import { OrderHttpService } from 'src/app/services/order-http.service';
import { ItemHttpService } from 'src/app/services/item-http.service';
import { Orders } from 'src/app/models/Orders';
import { Items } from 'src/app/models/Items';
import { SocketioService } from 'src/app/services/socketio.service';

@Component({
  selector: 'app-cook-details',
  templateUrl: './cook-details.page.html',
  styleUrls: ['./cook-details.page.scss']
})
export class CookDetailsPage implements OnInit {

  orderID;
  loadedOrder: Orders;
  loadedArrayOrder;
  loadedItemsArray = new Array<Items>();
  loadname;

  constructor(
    // tslint:disable-next-line: no-shadowed-variable
    private ActivatedRoute: ActivatedRoute,
    public menuCtrl: MenuController,
    private table: TableHttpService,
    private us: UserHttpService,
    private ord: OrderHttpService,
    private itm: ItemHttpService,
    private router: Router,
    private socketio: SocketioService
  ) {
    this.menuCtrl.enable(false);
    this.AcRoute();
    this.socketio.get().on('Cook', () => {
      this.AcRoute();
      console.log('Cook event recived');
    });
  }

  ChangeStatusDish(dishStatus: number, index: number) {
    if (dishStatus >= 0 && dishStatus <= 1) {
      this.ord
        .modifyDisState(this.orderID, index)
        .toPromise()
        .then(data => {
          console.log(data);
        })
        .catch(err => {
          console.log(err);
        });
    } else {
      console.log('Dish is already compleated');
    }
  }


  CheckOrderFinished() {
    // tslint:disable-next-line: no-string-literal
    const dishStatusArray = Object.values(this.loadedOrder['dishState']);
    let flag = 0;
    dishStatusArray.forEach(element => {
      if (element === 0 || element === 1) {
        flag = 1;
      }
    });
    if (flag === 0) {
      this.ord
        .modifyOrderState(this.orderID)
        .toPromise()
        .then(data => {
          console.log('Order Completed');
        });
      this.router.navigate(['cook']);
    } else {
      return console.log('Order not Completed');
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
          // tslint:disable-next-line: no-string-literal
          this.loadedArrayOrder = Object.values(this.loadedOrder['dishList']);
          console.log(this.loadedArrayOrder);
          this.itm
            .getItems()
            .toPromise()
            .then((it: Items[]) => {
              this.loadname = it;
              it.sort((itm1: Items, itm2: Items) => {
                return itm2.requiredTime - itm1.requiredTime;
              });
              this.loadname.forEach(element => {
                this.loadedArrayOrder.forEach(code => {
                  if (element.code === code) {
                    this.loadedItemsArray.push(element);
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
      this.us.get_role() !== 3
    ) {
      console.log('Acces Denided');
      this.us.logout();
    }
  }
}
