import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MenuController } from '@ionic/angular';
import { Stats } from '../../../models/Stats';
import { Users } from '../../../models/Users';
import { UserHttpService } from '../../../services/user-http.service';
import { StatHttpService } from '../../../services/stat-http.service';
import { HttpBackend } from '@angular/common/http';
import { SocketioService } from 'src/app/services/socketio.service';
@Component({
  selector: 'app-stats',
  templateUrl: './stats.page.html',
  styleUrls: ['./stats.page.scss']
})
export class StatsPage implements OnInit {
  stats;
  users;
  role;

  constructor(
    private router: Router,
    private stat: StatHttpService,
    private user: UserHttpService,
    public menuCtrl: MenuController,
    private socket: SocketioService
  ) {
    this.menuCtrl.enable(true);
    this.getStats();
    this.getUsers();
    this.role = this.user.get_role();
    this.socket.get().on('Cashier', () => {
      this.getStats();
      this.getUsers();
    })
  }

  public getStats() {
    this.stat
      .getStats()
      .toPromise()
      .then(stats => {
        this.stats = stats;
        console.log(stats);
      })
      .catch(err => {
        console.log(err);
      });
  }

  public getUsers() {
    this.user
      .get_users()
      .toPromise()
      .then(users => {
        this.users = users;
        console.log(users);
      })
      .catch(err => {
        console.log(err);
      });
  }

  ngOnInit() {
    if (
      this.user.get_token() === undefined ||
      this.user.get_token() === '' ||
      this.user.get_role() !== 1
    ) {
      console.log('Acces Denided');
      this.user.logout();
    }
  }
}
