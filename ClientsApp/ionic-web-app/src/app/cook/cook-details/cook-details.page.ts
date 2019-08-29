import { Component, OnInit } from "@angular/core";
import { MenuController } from "@ionic/angular";
import { ActivatedRoute } from "@angular/router";
import { TableHttpService } from "src/app/services/table-http.service";
import { UserHttpService } from "src/app/services/user-http.service";
import { OrderHttpService } from "src/app/services/order-http.service";
import { ItemHttpService } from "src/app/services/item-http.service";
import { Orders } from 'src/app/models/Orders';
import { element } from 'protractor';

@Component({
  selector: "app-cook-details",
  templateUrl: "./cook-details.page.html",
  styleUrls: ["./cook-details.page.scss"]
})
export class CookDetailsPage implements OnInit {

  loadedOrder: Orders[];
  loadedArrayOrder;
  constructor(
    private ActivatedRoute: ActivatedRoute,
    public menuCtrl: MenuController,
    private table: TableHttpService,
    private us: UserHttpService,
    private ord: OrderHttpService,
    private itm: ItemHttpService
  ) {
    this.menuCtrl.enable(false);
  }

  ngOnInit() {
    if (
      this.us.get_token() === undefined ||
      this.us.get_token() === "" ||
      this.us.get_role() !== 3
    ) {
      console.log('Acces Denided');
      this.us.logout();
    }
    this.ActivatedRoute.paramMap.subscribe(paramMap => {
      if (!paramMap.has('orderID')) {
        // redirect
        return;
      }
      const orderID = paramMap.get('orderID');
      this.ord.getOrder(parseInt(orderID, 10)).toPromise().then(order => {
        this.loadedOrder = order;
        console.log(this.loadedOrder);
        this.loadedArrayOrder = Object.values(this.loadedOrder['dishList']);
      }).catch(err => {
        console.log(err);
      });
    });
  }
}
