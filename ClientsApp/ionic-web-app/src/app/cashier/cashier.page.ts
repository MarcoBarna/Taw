import { Component, OnInit } from '@angular/core';
import { MenuController } from '@ionic/angular';
import { Router, RouterEvent } from '@angular/router';


@Component({
  selector: 'app-cashier',
  templateUrl: './cashier.page.html',
  styleUrls: ['./cashier.page.scss'],
})
export class CashierPage implements OnInit {



  constructor(private router: Router,  public menuCtrl: MenuController) {
    this.menuCtrl.enable(true);
  }

  ngOnInit() {
  }

}
