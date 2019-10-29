import { Component, OnInit } from '@angular/core';
import { MenuController } from '@ionic/angular';
import { AlertController } from '@ionic/angular';
import { Router } from '@angular/router';

@Component({
  selector: 'app-prepay',
  templateUrl: './prepay.page.html',
  styleUrls: ['./prepay.page.scss'],
})
export class PrepayPage implements OnInit {

  constructor(
    private menu: MenuController,
    private alertController: AlertController,
    public router: Router
  ) {
    this.menu.enable(false);
  }

  async presentAlert() {
    const alert = await this.alertController.create({
      header: 'Alert',
      subHeader: 'Information',
      message: 'Your order is complete, you can go anytime to pay at the cashier. Thank you',
      buttons: ['OK']
    });

    await alert.present().then( () => {
      console.log('CIAO');
      this.router.navigate(['login']);
    });
  }

  payCash() {
    console.log('CASH PAY')
  }

  payCard() {
    console.log('CARD PAY')
  }

  ngOnInit() {
  }

}
