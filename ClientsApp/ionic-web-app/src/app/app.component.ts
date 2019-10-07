import { Component, OnInit } from '@angular/core';

import { Platform, MenuController } from '@ionic/angular';
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
      title: 'Table Status List',
      url: 'cashier/menu/tablestatus',
      icon: 'home'
    },
    {
      title: 'Kitchen Queque',
      url: 'cashier/menu/kitchenque',
      icon: 'time'
    },
    {
      title: 'Tickets',
      url: 'cashier/menu/ticket',
      icon: 'paper'
    },
    {
      title: 'Users',
      url: 'cashier/menu/gestusers',
      icon: 'people'
    },
    {
      title: 'Tables',
      url: 'cashier/menu/gesttable',
      icon: 'basket'
    },
    {
      title: 'Items',
      url: 'cashier/menu/gestitem',
      icon: 'restaurant'
    },
    {
      title: 'Statistics',
      url: 'cashier/menu/stats',
      icon: 'stats'
    }
  ];


  constructor(
    private platform: Platform,
    private splashScreen: SplashScreen,
    private statusBar: StatusBar,
    private menuCtrl: MenuController,
  ) {
    this.initializeApp();
  }

  initializeApp() {
    this.platform.ready().then(() => {
      this.statusBar.styleDefault();
      this.splashScreen.hide();
    });
  }
  ngOnInit(){
  }
}
