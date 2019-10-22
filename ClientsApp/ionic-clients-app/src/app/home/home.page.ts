import { Component, OnInit } from '@angular/core';
import { MenuController } from '@ionic/angular';
import { AngularFireAuth } from '@angular/fire/auth';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit{

  constructor(public menuCtrl: MenuController, public afAuth: AngularFireAuth) { 
  }


  ionViewWillEnter() {
    this.menuCtrl.enable(true);
   }

   ngOnInit(): void {
    this.afAuth.user.subscribe(data => {console.log(data.getIdToken())});
   }
}
