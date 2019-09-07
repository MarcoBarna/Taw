import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MenuController } from '@ionic/angular';
import { OrderHttpService } from '../../../services/order-http.service';
import { Orders } from 'src/app/models/Orders';
import { UserHttpService } from 'src/app/services/user-http.service';
@Component({
  selector: 'app-vieworders',
  templateUrl: './vieworders.page.html',
  styleUrls: ['./vieworders.page.scss'],
})
export class ViewordersPage implements OnInit {

  private orders: Orders[];
  private role;

      constructor(
              private router: Router,
              public menuCtrl: MenuController,
              private order: OrderHttpService,
              private us: UserHttpService,) {
      this.menuCtrl.enable(true);  
      this.getOrders();
      this.role = this.us.get_role();
     }

     public getOrders() {
      this.order.getOrders().toPromise().then((orders: Orders[]) => {
        this.orders = orders;
        console.log(orders);
  
        orders.sort((order1: Orders, order2: Orders) => {
          return order1.tableNumber - order2.tableNumber;
        });
  
      }).catch((err) => {
        console.log(err);
      });
    }
  
    ngOnInit() {
      if (this.us.get_token() === undefined || this.us.get_token() === '' || this.us.get_role() !== 1) {
        console.log('Acces Denided');
        this.us.logout();
      }
    }

}
