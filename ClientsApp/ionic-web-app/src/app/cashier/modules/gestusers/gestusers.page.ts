import { Component, OnInit } from '@angular/core';
import { MenuController } from '@ionic/angular';
import { Router } from '@angular/router';

@Component({
  selector: 'app-gestusers',
  templateUrl: './gestusers.page.html',
  styleUrls: ['./gestusers.page.scss'],
})
export class GestusersPage implements OnInit {

  constructor(private router: Router,  public menuCtrl: MenuController) {
    this.menuCtrl.enable(true);
  }

  ngOnInit() {
  }

}
