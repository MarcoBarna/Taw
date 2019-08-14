import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MenuController } from '@ionic/angular';

@Component({
  selector: 'app-gestitem',
  templateUrl: './gestitem.page.html',
  styleUrls: ['./gestitem.page.scss'],
})
export class GestitemPage implements OnInit {

  constructor(private router: Router,  public menuCtrl: MenuController) {
    this.menuCtrl.enable(true);
  }

  ngOnInit() {
  }

}
