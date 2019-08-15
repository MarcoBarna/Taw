import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MenuController } from '@ionic/angular';
import { TableHttpService } from 'src/app/services/table-http.service';

@Component({
  selector: 'app-gesttable',
  templateUrl: './gesttable.page.html',
  styleUrls: ['./gesttable.page.scss'],
})
export class GesttablePage implements OnInit {

  controller = document.querySelector('ion-alert-controller');
  username;

  constructor(private router: Router,  public menuCtrl: MenuController, private table: TableHttpService) {
    this.menuCtrl.enable(true);
  }

  addTable(tableNumber: number, seats: number) {
    this.table.addTable(tableNumber, seats).toPromise().then(data => {
      console.log(data);
    }).catch(err => {
      console.log(err);
    });
  }

  // processForm(event) {
  //   event.preventDefault();
  //   this.controller.create({
  //     header: 'Table Created',
  //     message: 'Created table for admin',
  //     buttons: [{
  //       text: 'OK'
  //     }]
  //   }).then(alert => alert.present());
  // }

  ngOnInit() {
  }

}
