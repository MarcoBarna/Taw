import { Component, OnInit } from '@angular/core';
import { MenuController } from '@ionic/angular';
import { ActivatedRoute, Router } from '@angular/router';
import { TableHttpService } from 'src/app/services/table-http.service';
import { UserHttpService } from 'src/app/services/user-http.service';
import { OrderHttpService } from 'src/app/services/order-http.service';
import { ItemHttpService } from 'src/app/services/item-http.service';
import { Orders } from 'src/app/models/Orders';
import { Items } from 'src/app/models/Items';
import { element } from 'protractor';

@Component({
  selector: 'app-ticket-details',
  templateUrl: './ticket-details.page.html',
  styleUrls: ['./ticket-details.page.scss'],
})
export class TicketDetailsPage implements OnInit {

  orderID;
  loadedOrder: Orders;
  loadedArrayOrder;
  loadedArrayBevOrder;
  loadedItemsArray = new Array<Items>();
  loadname;
  loadTotal;
  loadCoverCharge;
  loadTable;
  constructor(
    // tslint:disable-next-line: no-shadowed-variable
    private ActivatedRoute: ActivatedRoute,
    public menuCtrl: MenuController,
    private table: TableHttpService,
    private us: UserHttpService,
    private ord: OrderHttpService,
    private itm: ItemHttpService,
    private router: Router
  ) {
    this.menuCtrl.enable(true);
  }

  CheckOrderFinished() {
    this.ActivatedRoute.paramMap.subscribe(paraMap => {
      if(!paraMap.has('orderID')) {
        return;
      }
      this.orderID = paraMap.get('orderID');
      this.ord.getOrder(this.orderID).toPromise().then( order => {
        this.table.changeTableStatus(order.tableNumber, 0).toPromise().then(() => {
          this.ord.modifyOrderState(this.orderID).toPromise().then(() => {
            console.log('Task Completed');
          }).catch(err => {
            console.log(err);
          });
        }).catch(err => {
          console.log(err);
        });
      }).catch(err => {
        console.log(err);
      });
    });
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
          this.loadedArrayOrder = Object.values(this.loadedOrder.dishList);
          // tslint:disable-next-line: no-string-literal
          this.loadedArrayBevOrder = Object.values(this.loadedOrder.beverageList);
          // tslint:disable-next-line: no-string-literal
          this.loadCoverCharge = this.loadedOrder['numberPeople'] * 2;
          console.log(this.loadCoverCharge);
          console.log(this.loadedArrayOrder);
          this.itm
            .getItems()
            .toPromise()
            .then((it: Items[]) => {
              this.loadname = it;
              it.sort((itm1: Items, itm2: Items) => {
                return itm2.price - itm1.price;
              });
              this.loadname.forEach(element => {
                this.loadedArrayOrder.forEach(code => {
                  if (element.code === code) {
                    this.loadedItemsArray.push(element);
                  }
                });
                this.loadedArrayBevOrder.forEach(code => {
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
      console.log(this.orderID);
      this.ord.getTicket(this.orderID).toPromise().then(result => {
        this.loadTotal = result;
        console.log(this.loadTotal);
      }).catch(err => {
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

    this.AcRoute();
  }

}
