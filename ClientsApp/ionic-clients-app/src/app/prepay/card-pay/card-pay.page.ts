import { Component, OnInit } from '@angular/core';
import { PayPal, PayPalPayment, PayPalConfiguration } from '@ionic-native/paypal/ngx';
import { Orders } from 'src/app/models/Orders';
import { Items } from 'src/app/models/Items';
import { MenuController } from '@ionic/angular';
import { ActivatedRoute, Router } from '@angular/router';
import { TableHttpService } from 'src/app/services/table-http.service';
import { UserHttpService } from 'src/app/services/user-http.service';
import { OrderHttpService } from 'src/app/services/order-http.service';
import { ItemHttpService } from 'src/app/services/item-http.service';

@Component({
  selector: 'app-card-pay',
  templateUrl: './card-pay.page.html',
  styleUrls: ['./card-pay.page.scss'],
})
export class CardPayPage implements OnInit {
 
  paymentAmount = '3.33';
  currency = 'USD';
  currencyIcon = '$';
  orderID;
  loadedOrder: Orders;
  loadedArrayOrder;
  loadedArrayBevOrder;
  loadedItemsArray = new Array<Items>();
  loadname;
  loadTotal;
  loadCoverCharge;
  loadTable;
  constructor(
    private payPal: PayPal,
    private ActivatedRoute: ActivatedRoute,
    public menuCtrl: MenuController,
    private table: TableHttpService,
    private us: UserHttpService,
    private ord: OrderHttpService,
    private itm: ItemHttpService,
    private router: Router
    
    ) { 
  }
  payWithPaypal() {
    this.payPal.init({
      PayPalEnvironmentProduction: 'YOUR_PRODUCTION_CLIENT_ID',
      PayPalEnvironmentSandbox: 'AXXhJjtppcr5GwTDCg4J08eJ_a3SBhDhy3VT5-O4-nNNB5Fm2y-tGWIWgVCgmVSoPzfLnoUtjA_MWevb'
    }).then(() => {
      // Environments: PayPalEnvironmentNoNetwork, PayPalEnvironmentSandbox, PayPalEnvironmentProduction
      this.payPal.prepareToRender('PayPalEnvironmentSandbox', new PayPalConfiguration({
        // Only needed if you get an "Internal Service Error" after PayPal login!
        //payPalShippingAddressOption: 2 // PayPalShippingAddressOptionPayPal
      })).then(() => {
        let payment = new PayPalPayment('3.33', 'USD', 'Description', 'sale');
        this.payPal.renderSinglePaymentUI(payment).then(() => {
          // Successfully paid
    
          // Example sandbox response
          //
          // {
          //   "client": {
          //     "environment": "sandbox",
          //     "product_name": "PayPal iOS SDK",
          //     "paypal_sdk_version": "2.16.0",
          //     "platform": "iOS"
          //   },
          //   "response_type": "payment",
          //   "response": {
          //     "id": "PAY-1AB23456CD789012EF34GHIJ",
          //     "state": "approved",
          //     "create_time": "2016-10-03T13:33:33Z",
          //     "intent": "sale"
          //   }
          // }
        }, (err) => {
          console.log(err)
          // Error or render dialog closed without being successful
        });
      }, (configErr) => {
        console.log('CONFIG ERROR' + configErr)
        // Error in configuration
      });
    }, (initErr) => {
      console.log('INIT ERROR' + initErr)
      // Error in initialization, maybe PayPal isn't supported or something else
    });
  }

//   CheckOrderFinished() {
//     this.ActivatedRoute.paramMap.subscribe(paraMap => {
//       if(!paraMap.has('orderID')) {
//         return;
//       }
//       this.orderID = paraMap.get('orderID');
//       this.ord.getOrder(this.orderID).toPromise().then( order => {
//         this.table.changeTableStatus(order.tableNumber, 0).toPromise().then(() => {
//           this.ord.modifyOrderState(this.orderID).toPromise().then(() => {
//             console.log('Task Completed');
//           }).catch(err => {
//             console.log(err);
//           });
//         }).catch(err => {
//           console.log(err);
//         });
//       }).catch(err => {
//         console.log(err);
//       });
//     });
// }

  AcRoute() {
    this.ActivatedRoute.paramMap.subscribe(paramMap => {
      if (!paramMap.has('orderID')) {
        // redirect
        return;
      }
      this.orderID = paramMap.get('orderID');
      console.log(this.orderID);
      this.ord
        .getOrder(parseInt(this.orderID, 10))
        .toPromise()
        .then(order => {
          this.loadedOrder = order;
          console.log(this.loadedOrder);
          // tslint:disable-next-line: no-string-literal
          this.loadedArrayOrder = Object.values(this.loadedOrder.dishList);
          // tslint:disable-next-line: no-string-literal
          this.loadedArrayBevOrder = Object.values(this.loadedOrder.beverageList);
          // tslint:disable-next-line: no-string-literal
          this.loadCoverCharge = this.loadedOrder['numberPeople'] * 2;
          console.log(this.loadCoverCharge);
          console.log(this.loadedArrayOrder);
          this.itm
            .getItems()
            .toPromise()
            .then((it: Items[]) => {
              this.loadname = it;
              it.sort((itm1: Items, itm2: Items) => {
                return itm2.price - itm1.price;
              });
              this.loadname.forEach(element => {
                this.loadedArrayOrder.forEach(code => {
                  if (element.code === code) {
                    this.loadedItemsArray.push(element);
                  }
                });
                this.loadedArrayBevOrder.forEach(code => {
                  if (element.code === code) {
                    this.loadedItemsArray.push(element);
                  }
                });
              });
              console.log(this.loadedItemsArray);
            })
            .catch(err => {
              console.log(err);
            });
        })
        .catch(err => {
          console.log(err);
        });
      console.log(this.orderID);
      this.ord.getTicket(this.orderID).toPromise().then(result => {
        this.loadTotal = result;
        console.log(this.loadTotal);
      }).catch(err => {
        console.log(err);
      });
    });
  }
  ngOnInit(): void {
    this.AcRoute();
  }

}