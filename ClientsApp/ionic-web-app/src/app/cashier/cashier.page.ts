import { Component, OnInit } from '@angular/core';
import { MenuController } from '@ionic/angular';
import { Router, RouterEvent } from '@angular/router';


@Component({
  selector: 'app-cashier',
  templateUrl: './cashier.page.html',
  styleUrls: ['./cashier.page.scss'],
})
export class CashierPage implements OnInit {

  pages = [
    {
      title: 'Table Status',
      url: 'tablestatus'
    },
    {
      title: 'Kitchen Queque',
      url: 'kitchenque'
    },
    {
      title: 'Tickets',
      url: 'ticket'
    },
    {
      title: 'User Management ',
      url: 'gestusers'
    },
    {
      title: 'Statistics',
      url: 'stats'
    }
  ];

  selectedPath = '';

  constructor(private router: Router) {
    this.router.events.subscribe((event: RouterEvent) => {
      this.selectedPath = event.url;
    });
  }

  ngOnInit() {
  }

}
