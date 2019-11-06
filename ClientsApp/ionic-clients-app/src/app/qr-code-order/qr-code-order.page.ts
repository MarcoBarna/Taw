import { Component, OnInit } from '@angular/core';
import { UserHttpService } from '../services/user-http.service';
import { TableHttpService } from '../services/table-http.service';
import { MenuController, AlertController, Platform } from '@ionic/angular';
import { OrderHttpService } from '../services/order-http.service';
import { ItemHttpService } from '../services/item-http.service';
import { ActivatedRoute, Router } from '@angular/router';
import { AngularFireAuth } from '@angular/fire/auth';
import { Tables } from '../models/Tables';
import { Items } from '../models/Items';
import { BarcodeScanner } from '@ionic-native/barcode-scanner/ngx';

@Component({
  selector: 'app-qr-code-order',
  templateUrl: './qr-code-order.page.html',
  styleUrls: ['./qr-code-order.page.scss']
})
export class QrCodeOrderPage implements OnInit {
  private role;
  private nick;
  scandata = null;
  loadedTable: Tables;
  tableID: number;
  peopleArray: number[];
  loadedDish: Items[];
  loadedBev: Items[];
  NpeopleSeated: number;
  NumOrder: number[];
  dishList: string[];
  beverageList: string[];
  usr;

  constructor(
    private qrscanner: BarcodeScanner,
    private table: TableHttpService,
    public menuCtrl: MenuController,
    private us: UserHttpService,
    private ord: OrderHttpService,
    private itm: ItemHttpService,
    private router: Router,
    private ActivatedRoute: ActivatedRoute,
    private afAuth: AngularFireAuth,
    private alertController: AlertController
  ) {
    // Now disable scanning when back button is pressed
  }


  async presentAlertTemp(message: string) {
    const alert = await this.alertController.create({
      header: 'Alert',
      subHeader: 'Camera Permission',
      message,
      buttons: ['OK']
    });

    await alert.present().then(() => {
      this.router.navigate(['login']);
    });
  }

  scanCode() {
    this.qrscanner.scan().then(qrCodeData => {
      this.scandata = qrCodeData.text;
      console.log(this.scandata);
    });
  }

  ngOnInit() {
  }
}
