import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MenuController } from '@ionic/angular';

@Component({
  selector: 'app-kitchenque',
  templateUrl: './kitchenque.page.html',
  styleUrls: ['./kitchenque.page.scss'],
})
export class KitchenquePage implements OnInit {

  constructor(private router: Router,  public menuCtrl: MenuController) {
    this.menuCtrl.enable(true);
  }

  ngOnInit() {
  }

}
