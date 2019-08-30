import { Component, OnInit } from '@angular/core';
import { MenuController } from '@ionic/angular';
import { TableHttpService } from 'src/app/services/table-http.service';
import { UserHttpService } from 'src/app/services/user-http.service';
import { OrderHttpService } from 'src/app/services/order-http.service';
import { ItemHttpService } from 'src/app/services/item-http.service';

@Component({
  selector: 'app-vieworders',
  templateUrl: './vieworders.page.html',
  styleUrls: ['./vieworders.page.scss'],
})
export class ViewordersPage implements OnInit {

  constructor(public menuCtrl: MenuController,
              private table: TableHttpService,
              private us: UserHttpService,
              private ord: OrderHttpService,
              private itm: ItemHttpService) {
      this.menuCtrl.enable(true);
     }

  ngOnInit() {
    if (this.us.get_token() === undefined || this.us.get_token() === '' || this.us.get_role() !== 1) {
      console.log('Acces Denided');
      this.us.logout();
    }
  }

}
