import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MenuController } from '@ionic/angular';
import { ItemHttpService } from 'src/app/services/item-http.service';

@Component({
  selector: 'app-gestitem',
  templateUrl: './gestitem.page.html',
  styleUrls: ['./gestitem.page.scss'],
})
export class GestitemPage implements OnInit {

  item = {};
  items = [];

  constructor(private router: Router,  public menuCtrl: MenuController, private itm: ItemHttpService) {
    this.menuCtrl.enable(true);
    this.getAllItems();
  }

  ngOnInit() {
  }

  getSingleItem(code: number) {
    this.itm.getSingleItem(code).subscribe((data) => {
      this.item = data;
      console.log(this.item);
    });
  }

  getAllItems() {
    this.itm.getItems().subscribe((data) => {
      this.items = data;
      this.items.sort((item1,item2) => {
        return item1.code - item2.code;
      });
      console.log(this.items);
    })
  }

  sendItem(code: number, name: string, requiredTime: number , price: number){
    this.itm.addItem(code, name, requiredTime, price).subscribe((data) => {
      console.log(code, name, requiredTime, price);
    });
  }
}
