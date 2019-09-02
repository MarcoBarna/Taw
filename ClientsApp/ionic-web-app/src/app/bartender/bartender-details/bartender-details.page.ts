import { Component, OnInit } from '@angular/core';
import { Orders } from 'src/app/models/Orders';
import { Items } from 'src/app/models/Items';
import { MenuController } from '@ionic/angular';
import { TableHttpService } from 'src/app/services/table-http.service';
import { table } from 'console';
import { OrderHttpService } from 'src/app/services/order-http.service';
import { ItemHttpService } from 'src/app/services/item-http.service';
import { UserHttpService } from 'src/app/services/user-http.service';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-bartender-details',
  templateUrl: './bartender-details.page.html',
  styleUrls: ['./bartender-details.page.scss'],
})
export class BartenderDetailsPage implements OnInit {

  orderID;
  loadedOrder: Orders[];
  loadedArrayOrder;
  loadedItemsArray = new Array<Items>();
  loadname;
  public ionicNamedColor = 'primary';
  constructor(
    private ActivatedRoute: ActivatedRoute,
    public menuCtrl: MenuController,
    private table: TableHttpService,
    private us: UserHttpService,
    private ord: OrderHttpService,
    private itm: ItemHttpService,
    private router: Router
  ) {
    this.menuCtrl.enable(false);
  }

  OrderFinished() {
    this.ord
      .modifyBevState(this.orderID)
      .toPromise()
      .then(data => {
        console.log('Order Completed');
      })
      .catch(err => {
        console.log(err);
      });
    this.router.navigate(['bartender']);

  }

  ngOnInit() {
    if (
      this.us.get_token() === undefined ||
      this.us.get_token() === '' ||
      this.us.get_role() !== 4
    ) {
      console.log('Acces Denided');
      this.us.logout();
    }
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
          this.loadedArrayOrder = Object.values(this.loadedOrder['beverageList']);
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

}
