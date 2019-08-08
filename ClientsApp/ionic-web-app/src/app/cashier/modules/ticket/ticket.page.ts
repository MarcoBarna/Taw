import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MenuController } from '@ionic/angular';

@Component({
  selector: 'app-ticket',
  templateUrl: './ticket.page.html',
  styleUrls: ['./ticket.page.scss'],
})
export class TicketPage implements OnInit {

  constructor(private router: Router,  public menuCtrl: MenuController) {
    this.menuCtrl.enable(true);
  }

  ngOnInit() {
  }

}
