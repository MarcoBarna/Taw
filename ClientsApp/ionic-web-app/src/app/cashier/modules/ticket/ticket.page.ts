import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MenuController } from '@ionic/angular';
import { UserHttpService } from 'src/app/services/user-http.service';

@Component({
  selector: 'app-ticket',
  templateUrl: './ticket.page.html',
  styleUrls: ['./ticket.page.scss'],
})
export class TicketPage implements OnInit {

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
