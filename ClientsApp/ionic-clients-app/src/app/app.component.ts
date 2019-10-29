import { Component, OnInit } from '@angular/core';

import { Platform, MenuController } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { Router, RouterEvent, NavigationEnd } from '@angular/router';
import { AngularFireAuth } from '@angular/fire/auth';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss']
})
export class AppComponent implements OnInit {
  public appPages = [
    {
      title: 'Home',
      url: 'login',
      icon: 'home'
    },
    {
      title: 'Terms',
      url: 'terms',
      icon: 'list'
    },
    {
      title: 'Privacy',
      url: 'privacy',
      icon: 'list'
    }
  ];

  constructor(
    private platform: Platform,
    private splashScreen: SplashScreen,
    private statusBar: StatusBar,
    private menuCtrl: MenuController,
    private router: Router,
    private afAuth: AngularFireAuth
  ) {
    this.initializeApp();
  }

  Logout(){
    this.afAuth.auth.signOut().then(() => {
      this.router.navigate(['login']).then(() => {
        location.reload();
      });
    });
  }

  initializeApp() {
    this.platform.ready().then(() => {
      this.statusBar.styleDefault();
      this.splashScreen.hide();
    });
  }
 
  // We call the method subscribe because we don't want the menu enabled on login
  ngOnInit(){
  }
}
