import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MenuController } from '@ionic/angular';

@Component({
  selector: 'app-stats',
  templateUrl: './stats.page.html',
  styleUrls: ['./stats.page.scss'],
})
export class StatsPage implements OnInit {

  constructor(private router: Router,  public menuCtrl: MenuController) {
    this.menuCtrl.enable(true);
  }

  ngOnInit() {
  }

}
