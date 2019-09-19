import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { MenuController } from "@ionic/angular";
import { ItemHttpService } from "src/app/services/item-http.service";
import { UserHttpService } from "src/app/services/user-http.service";
import { ToastrService } from "ngx-toastr";

@Component({
  selector: "app-gestitem",
  templateUrl: "./gestitem.page.html",
  styleUrls: ["./gestitem.page.scss"]
})
export class GestitemPage implements OnInit {
  item = {};
  items = [];
  code: string;
  itemName: string;
  reqTime: string;
  price: string;

  constructor(
    private router: Router,
    public menuCtrl: MenuController,
    private itm: ItemHttpService,
    private us: UserHttpService,
    private toast: ToastrService
  ) {
    this.menuCtrl.enable(true);
    // this.getAllItems();
  }

  ngOnInit() {
    if (
      this.us.get_token() === undefined ||
      this.us.get_token() === "" ||
      this.us.get_role() !== 1
    ) {
      console.log("Acces Denided");
      this.us.logout();
    }
  }

  getSingleItem(code: number) {
    this.itm
      .getSingleItem(code)
      .toPromise()
      .then(data => {
        this.item = data;
        console.log(this.item);
      });
  }

  getAllItems() {
    this.itm
      .getItems()
      .toPromise()
      .then(data => {
        this.items = data;
        this.items.sort((item1, item2) => {
          return item1.code - item2.code;
        });
        console.log(this.items);
      })
      .catch(err => {
        console.log(err);
      });
  }

  sendItem(code: number, name: string, requiredTime: number, price: number) {
    this.itm
      .addItem(code, name, requiredTime, price)
      .toPromise()
      .then(data => {
        console.log(code, name, requiredTime, price);
        this.toast.success('Item added successfully');
      })
      .catch(err => {
        console.log(err);
        this.toast.error(err.error);
      });
    this.code = "";
    this.itemName = "";
    this.reqTime = "";
    this.price = "";
  }
}
