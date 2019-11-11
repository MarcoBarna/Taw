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
  // Use matchMedia to check the user preference

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
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)');

    this.toggleDarkTheme(prefersDark.matches);

    // Listen for changes to the prefers-color-scheme media query
    prefersDark.addListener((mediaQuery) => this.toggleDarkTheme(mediaQuery.matches));

    // Add or remove the "dark" class based on if the media query matches
    this.initializeApp();
  }

  toggleDarkTheme(shouldAdd) {
    document.body.classList.toggle('dark', shouldAdd);
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
