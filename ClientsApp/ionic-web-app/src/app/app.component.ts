import { Component, OnInit } from '@angular/core';

import { Platform } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss']
})

export class AppComponent implements OnInit  {

  public appPages = [
    {
      title: 'Dashboard',
      url: 'cashier/menu'
    },
    {
      title: 'Table Status',
      url: 'cashier/menu/tablestatus'
    },
    {
      title: 'Kitchen Queque',
      url: 'cashier/menu/kitchenque'
    },
    {
      title: 'Tickets',
      url: 'cashier/menu/ticket'
    },
    {
      title: 'User Management',
      url: 'cashier/menu/gestusers'
    },
    {
      title: 'Statistics',
      url: 'cashier/menu/stats'
    }
  ];


  constructor(
    private platform: Platform,
    private splashScreen: SplashScreen,
    private statusBar: StatusBar
  ) {
    this.initializeApp();
  }

  initializeApp() {
    this.platform.ready().then(() => {
      this.statusBar.styleDefault();
      this.splashScreen.hide();
    });
  }
  ngOnInit(): void {
    throw new Error('Method not implemented.');
  }
}
