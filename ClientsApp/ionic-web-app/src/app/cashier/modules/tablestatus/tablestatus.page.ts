import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MenuController } from '@ionic/angular';

@Component({
  selector: 'app-tablestatus',
  templateUrl: './tablestatus.page.html',
  styleUrls: ['./tablestatus.page.scss'],
})
export class TablestatusPage implements OnInit {

  tables = [
    
  ]

  constructor(private router: Router,  public menuCtrl: MenuController) {
    this.menuCtrl.enable(true);
  }

  ngOnInit() {
  }

}
