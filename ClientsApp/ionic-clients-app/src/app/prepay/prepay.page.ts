import { Component, OnInit } from '@angular/core';
import { MenuController } from '@ionic/angular';
import { AlertController } from '@ionic/angular';
import { Router } from '@angular/router';
import { AngularFireAuth } from '@angular/fire/auth';

@Component({
  selector: 'app-prepay',
  templateUrl: './prepay.page.html',
  styleUrls: ['./prepay.page.scss'],
})
export class PrepayPage implements OnInit {

  orderID;
  usr;

  constructor(
    private menu: MenuController,
    private alertController: AlertController,
    public router: Router,
    private afAuth: AngularFireAuth,

  ) {
    this.menu.enable(false);
  }

  async presentAlert() {
    const alert = await this.alertController.create({
      header: 'Alert',fzzzzz
      subHeader: 'Information',
      message: 'Your order is complete, you can go anytime to pay at the cashier. Thank you',
      buttons: ['OK']
    });

    await alert.present().then( () => {
      console.log('CIAO');
      this.router.navigate(['login']);
    });
  }
  ngOnInit() {
    this.orderID = 0;
    this.afAuth.user.subscribe(data => {
      if (data !== null) {
        this.usr = {
          username : data.email,
          uid : data.uid
        };
        console.log(this.usr);
       }
    });
    
  }
}
