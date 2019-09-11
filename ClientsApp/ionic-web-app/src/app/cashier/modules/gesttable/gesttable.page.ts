import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MenuController } from '@ionic/angular';
import { TableHttpService } from 'src/app/services/table-http.service';
import { UserHttpService } from 'src/app/services/user-http.service';

@Component({
  selector: 'app-gesttable',
  templateUrl: './gesttable.page.html',
  styleUrls: ['./gesttable.page.scss'],
})
export class GesttablePage implements OnInit {

  controller = document.querySelector('ion-alert-controller');
  username;

  constructor(private router: Router,  public menuCtrl: MenuController, private table: TableHttpService, private us: UserHttpService) {
    this.menuCtrl.enable(true);
  }

  addTable(tableNumber: number, seats: number) {
    this.table.addTable(tableNumber, seats).toPromise().then(data => {
      console.log(data);
    }).catch(err => {
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
