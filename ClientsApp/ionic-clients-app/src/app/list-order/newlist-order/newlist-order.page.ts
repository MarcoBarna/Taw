import { Component, OnInit } from '@angular/core';
import { Tables } from 'src/app/models/Tables';
import { Items } from 'src/app/models/Items';
import { Router, ActivatedRoute } from '@angular/router';
import { ItemHttpService } from 'src/app/services/item-http.service';
import { OrderHttpService } from 'src/app/services/order-http.service';
import { UserHttpService } from 'src/app/services/user-http.service';
import { MenuController } from '@ionic/angular';
import { TableHttpService } from 'src/app/services/table-http.service';

@Component({
  selector: 'app-newlist-order',
  templateUrl: './newlist-order.page.html',
  styleUrls: ['./newlist-order.page.scss'],
})
export class NewlistOrderPage implements OnInit {
  private role;
  private nick;
  loadedTable: Tables;
  tableID: number;
  peopleArray: number[];
  loadedDish: Items[];
  loadedBev: Items[];
  NpeopleSeated: number;
  NumOrder: number[];
  dishList: string[];
  beverageList: string[];

  constructor(
    private ActivatedRoute: ActivatedRoute,
    private table: TableHttpService,
    public menuCtrl: MenuController,
    private us: UserHttpService,
    private ord: OrderHttpService,
    private itm: ItemHttpService,
    private router: Router,
    // private socket: SocketioService,
  ) { }
  SendPeopleData(nPeople: number) {
    this.NpeopleSeated = nPeople;
    console.log(this.NpeopleSeated);

    if(nPeople !== undefined) {
      this.NumOrder = [];
      for(let i = 0; i < nPeople; i++) {
        this.NumOrder.push(i);
      }
    }
  }

  BuildDishList(dish, index) {
    this.dishList.splice(index, 1 , dish);
    console.log(this.dishList);
  }

  BuildBeverageList(beverage, index) {
    this.beverageList.splice(index, 1 , beverage);
    console.log(this.beverageList);
  }
  sendOrder() {
    const arrayOutDish: number[] = [];
    this.dishList.forEach(item => {
      arrayOutDish.push(parseInt(item, 10));
    });

    const arrayOutBev: number[] = [];
    this.beverageList.forEach(item => {
      arrayOutBev.push(parseInt(item, 10));
    });
    const date = new Date();
    console.log(this.NpeopleSeated, arrayOutDish, arrayOutBev);
    const value =
      `${this.tableID}` +
      date.getDate() +
      date.getMonth() +
      date.getFullYear() +
      (date.getHours() < 10 ? '0' : '') +
      date.getHours() +
      (date.getMinutes() < 10 ? '0' : '') +
      date.getMinutes() +
      (date.getSeconds() < 10 ? '0' : '') +
      date.getSeconds();
    this.ord.addOrderClient(parseInt(value, 10), arrayOutBev, arrayOutDish, this.NpeopleSeated, this.tableID)
      .toPromise()
      .then(or => {
        console.log(or);
      })
      .catch(err => {
        console.log(err);
      });
    this.table
      .changeTableStatus(this.tableID, parseInt(value, 10))
      .toPromise()
      .then(tb => {
        console.log(tb);
      })
      .catch(err => {
        console.log(err);
      });
    this.router.navigate(['prepay']);
  }
  ngOnInit() {
    this.ActivatedRoute.paramMap.subscribe(paramMap => {
      if (!paramMap.has('tableID')) {
        // redirect
        return;
      }
      this.tableID = parseInt(paramMap.get('tableID'), 10);
      this.table
        .getSingleTable(this.tableID)
        .toPromise()
        .then(tab => {
          this.peopleArray = [];
          this.loadedTable = tab;
          for(let i = 0; i < this.loadedTable.seats; i++){
            this.peopleArray.push(i + 1);
          }
          console.log(this.loadedTable);
        });
      this.itm
      .getItems()
      .toPromise()
      .then(it => {
        this.loadedDish = [];
        this.loadedBev = [];
        it.forEach(element => {
          if (element.code >= 100 && element.code <= 199 ) {
            this.loadedBev.push(element);
          } else {
            this.loadedDish.push(element);
          }
        });
        console.log(this.loadedDish);
        console.log(this.loadedBev);
        this.dishList = [];
        this.beverageList = [];
      });
    });
  }

}
