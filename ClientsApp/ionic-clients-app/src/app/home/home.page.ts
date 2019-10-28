import { Component, OnInit } from '@angular/core';
import { MenuController } from '@ionic/angular';
import { AngularFireAuth } from '@angular/fire/auth';
import { UserHttpService } from '../services/user-http.service';
import { TableHttpService } from '../services/table-http.service';
@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss']
})
export class HomePage implements OnInit {

  usr;
  loggedin: boolean;

  constructor(
    public menuCtrl: MenuController,
    private afAuth: AngularFireAuth,
    private us: UserHttpService,
    private table: TableHttpService
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
        this.us.login('client', 'client').toPromise().then(data => {
          this.loggedin = true;
          console.log(data);
          this.table.getTables().toPromise().then(tables => {
            console.log(tables);
          })
        });
      } else {
        this.loggedin = false;
      }
    });
  }
}
