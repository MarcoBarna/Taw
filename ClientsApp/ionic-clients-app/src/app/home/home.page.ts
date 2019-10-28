import { Component, OnInit } from '@angular/core';
import { MenuController } from '@ionic/angular';
import { AngularFireAuth } from '@angular/fire/auth';
import { UserHttpService } from '../services/user-http.service';
@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss']
})
export class HomePage implements OnInit {

  usr;

  constructor(
    public menuCtrl: MenuController,
    private afAuth: AngularFireAuth,
  ) {}

  ionViewWillEnter() {
    this.menuCtrl.enable(true);
  }

  ngOnInit(): void {
    this.afAuth.user.subscribe(data => {

      if (data !== null) {
        this.usr = {
          username : data.email,
          uid : data.uid
        };
        console.log(this.usr);
      }
    });
  }
}
