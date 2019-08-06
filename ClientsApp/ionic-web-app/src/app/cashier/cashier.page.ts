import { Component, OnInit } from '@angular/core';
import { MenuController } from '@ionic/angular';
import { Router, RouterEvent } from '@angular/router';


@Component({
  selector: 'app-cashier',
  templateUrl: './cashier.page.html',
  styleUrls: ['./cashier.page.scss'],
})
export class CashierPage implements OnInit {

  selectedPath = '';
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
  
  constructor(private router: Router) {
    this.router.events.subscribe((event: RouterEvent) => {
      if(event && event.url){
        this.selectedPath = event.url;
        console.log(this.selectedPath);
      }
    });
  }

  ngOnInit() {
  }

}
