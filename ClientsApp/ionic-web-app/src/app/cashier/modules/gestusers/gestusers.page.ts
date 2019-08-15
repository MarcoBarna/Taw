import { Component, OnInit } from '@angular/core';
import { MenuController } from '@ionic/angular';
import { Router } from '@angular/router';
import { UserHttpService } from 'src/app/services/user-http.service';

@Component({
  selector: 'app-gestusers',
  templateUrl: './gestusers.page.html',
  styleUrls: ['./gestusers.page.scss'],
})
export class GestusersPage implements OnInit {

  constructor(private router: Router,  public menuCtrl: MenuController, private usr: UserHttpService) {
    this.menuCtrl.enable(true);
  }

  ngOnInit() {
  }

  addUser(username: string, password: string, role: number) {
    const user = {
      username,
      password,
      role
    }
    this.usr.register(user).toPromise().then(data => {
      console.log(data);
    })
    .catch(err => {
      console.log(err);
    });
  }

}
