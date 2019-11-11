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
  scanTableData = null;
  scanBeverageData;
  scanDishData;
  finishedBevData = false;
  peopleArray: number[];
  loadedItem: Items[];
  NpeopleSeated = null;
  usr;

  constructor(
    private qrscanner: BarcodeScanner,
    private table: TableHttpService,
    public menuCtrl: MenuController,
    private us: UserHttpService,
    private ord: OrderHttpService,
    private itm: ItemHttpService,
    private router: Router,
    // tslint:disable-next-line: no-shadowed-variable
    private ActivatedRoute: ActivatedRoute,
    private afAuth: AngularFireAuth,
    private alertController: AlertController
  ) {
    // Now disable scanning when back button is pressed
  }

  async presentAlertTemp(message) {
    const alert = await this.alertController.create({
      header: 'Alert',
      subHeader: 'information',
      message,
      buttons: ['OK']
    });

    await alert.present().then(() => {
      this.router.navigate(['login']);
    });
  }

  SendPeopleData(nPeople: number) {
    this.NpeopleSeated = nPeople;
    console.log(this.NpeopleSeated);
  }

  NextScan() {
    this.finishedBevData = true;
  }

  finishOrder() {
    this.presentAlertTemp(`IT WORKS`);
  }

  scanCodeTable() {
    this.qrscanner.scan().then(qrCodeData => {
      this.scanTableData = qrCodeData.text;
      console.log(this.scanTableData);
      this.table.getSingleTable(this.scanTableData).subscribe(table => {
        this.peopleArray = [];
        for (let i = 0; i < table.seats; i++) {
          this.peopleArray.push(i + 1);
        }
      });
    });
  }

  scanCodeFood(mode: number, type: string) {
    if (mode === 1) {
      if (type === 'beverage') {
        this.scanBeverageData.pop();
        console.log('Beverage Array ' + this.scanBeverageData);
      }
      if (type === 'dish') {
        this.scanDishData.pop();
        console.log('Dish Array ' + this.scanDishData);
      }
    } else if (mode === 0) {
      this.qrscanner.scan().then(qrCodeData => {
        if (type === 'beverage') {
          this.scanBeverageData.push(parseInt(qrCodeData.text, 10));
          console.log('Beverage Array ' + this.scanBeverageData);
          console.log(this.loadedItem);
        }
        if (type === 'dish') {
          this.scanDishData.push(parseInt(qrCodeData.text, 10));
          console.log('Dish Array ' + this.scanDishData);
        }
      });
    }
  }

  sendDataOrder(bevList, dList, nPeople, TableID) {
    const date = new Date();
    const value =
      `${this.scanTableData}` +
      date.getDate() +
      date.getMonth() +
      date.getFullYear() +
      (date.getHours() < 10 ? '0' : '') +
      date.getHours() +
      (date.getMinutes() < 10 ? '0' : '') +
      date.getMinutes() +
      (date.getSeconds() < 10 ? '0' : '') +
      date.getSeconds();
    this.afAuth.user.subscribe(data => {
        if (data !== null) {
          this.usr = {
            username : data.email,
            uid : data.uid
          };
         }
        console.log(bevList + '|' + dList + '|' + nPeople + '|' + TableID + '|' + this.usr.uid);
        this.ord.addOrderClient(parseInt(value, 10), bevList, dList, nPeople, TableID, this.usr.uid)
         .toPromise()
         .then(or => {
           console.log(or);
           this.table.changeTableStatus(this.scanTableData, parseInt(value, 10)).toPromise().then(data => {
            console.log(data);
            this.router.navigate(['prepay', or.orderNumber]);
          })
          .catch(err => {
            console.log(err);
          });
         })
         .catch(err => {
           console.log(err);
         });
      });
  }

  ngOnInit() {
    this.itm.getItems().subscribe(it => {
      this.loadedItem = [];
      this.loadedItem = it;
      console.log(this.loadedItem);
    });
    this.scanBeverageData = [];
    this.scanDishData = [];
  }
}