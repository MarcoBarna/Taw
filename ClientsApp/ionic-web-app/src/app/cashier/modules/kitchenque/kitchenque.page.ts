import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MenuController } from '@ionic/angular';
import { UserHttpService } from 'src/app/services/user-http.service';

@Component({
  selector: 'app-kitchenque',
  templateUrl: './kitchenque.page.html',
  styleUrls: ['./kitchenque.page.scss'],
})
export class KitchenquePage implements OnInit {

  constructor(private router: Router,  public menuCtrl: MenuController, private us: UserHttpService) {
    this.menuCtrl.enable(true);
  }

  ngOnInit() {
    if (this.us.get_token() === undefined || this.us.get_token() === '' || this.us.get_role() !== 1) {
      console.log('Acces Denided');
      this.us.logout();
    }
  }

}
