import { Component, OnInit } from '@angular/core';
import { QRScanner, QRScannerStatus } from '@ionic-native/qr-scanner/ngx';
import { UserHttpService } from '../services/user-http.service';
import { TableHttpService } from '../services/table-http.service';
import { MenuController, AlertController } from '@ionic/angular';
import { OrderHttpService } from '../services/order-http.service';
import { ItemHttpService } from '../services/item-http.service';
import { ActivatedRoute, Router } from '@angular/router';
import { AngularFireAuth } from '@angular/fire/auth';
import { Tables } from '../models/Tables';
import { Items } from '../models/Items';


@Component({
  selector: 'app-qr-code-order',
  templateUrl: './qr-code-order.page.html',
  styleUrls: ['./qr-code-order.page.scss'],
})
export class QrCodeOrderPage implements OnInit {
  private role;
  private nick;
  encodedData = '';
  QRSCANNED_DATA: string;
  isOn = false;
  scannedData: {};
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
    public qrScanner: QRScanner,
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
  }
  async presentAlertPermDenied() {
    const alert = await this.alertController.create({
      header: 'Alert',
      subHeader: 'Camera Permission',
      message: 'To use this feature you need to enable Camera Permission Thank you',
      buttons: ['OK']
    });
    this.router.navigate(['login']);
    await alert.present().then( () => {
      this.qrScanner.openSettings();
    });
  }

  async presentAlertTempDenied() {
    const alert = await this.alertController.create({
      header: 'Alert',
      subHeader: 'Camera Permission',
      message: 'To use this feature you need to enable Camera Permission Thank you',
      buttons: ['OK']
    });

    await alert.present().then( () => {
      this.router.navigate(['login']);
    });
  }

  presentQrScanner() {
    this.qrScanner.prepare()
    .then((status: QRScannerStatus) => {
      if (status.authorized) {
        // camera permission was granted
        this.isOn = true;

        // start scanning
        const scanSub = this.qrScanner.scan().subscribe((text: string) => {
          console.log('Scanned something', text);
          this.isOn = false;
          this.QRSCANNED_DATA = text;
          if (this.QRSCANNED_DATA !== ''){
            this.closeScanner();
            scanSub.unsubscribe(); // stop scanning
          }
        });
        this.qrScanner.show();

      } else if (status.denied) {
        this.presentAlertPermDenied();
      } else {
        this.presentAlertTempDenied();
      }
    })
    .catch((e: any) => console.log('Error is', e));
  }

  closeScanner() {
    this.qrScanner.hide(); // hide camera preview
    this.qrScanner.destroy(); // destroy camera preview
  }
  ngOnInit() {
  }

}
