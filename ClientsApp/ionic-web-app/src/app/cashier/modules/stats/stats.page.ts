import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MenuController } from '@ionic/angular';
import { Stats } from 'src/app/models/Stats';
import { UserHttpService } from 'src/app/services/user-http.service';
import { StatHttpService } from '../../../services/stat-http.service';

@Component({
  selector: 'app-stats',
  templateUrl: './stats.page.html',
  styleUrls: ['./stats.page.scss'],
})
export class StatsPage implements OnInit {

  private stats: Stats[];
  private role;

  constructor(private router: Router, private stat: StatHttpService , private user: UserHttpService, public menuCtrl: MenuController) {
    this.menuCtrl.enable(true);
    this.getStats();
    this.role = this.user.get_role();
  }

  public getStats() {
    this.stat.getStats().toPromise().then((stats: Stats[]) => {
      this.stats = stats;
      console.log(stats);

    }).catch((err) => {
      console.log(err);
    });
  }

  ngOnInit() {
    if (this.user.get_token() === undefined || this.user.get_token() === '' || this.user.get_role() !== 1) {
      console.log('Acces Denided');
      this.user.logout();
    }
  }

}
