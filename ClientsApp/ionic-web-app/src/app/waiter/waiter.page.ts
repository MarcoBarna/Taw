import { Component, OnInit } from '@angular/core';
import { UserHttpService } from '../services/user-http.service';
import { Router } from '@angular/router';
import { MenuController } from '@ionic/angular';
import { TableHttpService } from '../services/table-http.service';
import { Tables } from 'src/app/models/Tables';
import { SocketioService } from '../services/socketio.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-waiter',
  templateUrl: './waiter.page.html',
  styleUrls: ['./waiter.page.scss'],
})
export class WaiterPage implements OnInit {

  private role;
  private tables: Tables[];
  private nick;
  constructor(
    private us: UserHttpService,
    private router: Router,
    private menuCRTL: MenuController,
    private table: TableHttpService,
    private socket: SocketioService,
    private toast: ToastrService
    ) {
    this.menuCRTL.enable(false);
    this.getTables();
    this.role = this.us.get_role();
    this.socket.get().on('Waiter', () => {
      this.getTables();
    });
    this.socket.get().on('Dishes Ready', (data) => {
      const nick = this.us.get_nick();
      const usr = data.username;
      const table = data.table;
      console.log(nick);
      console.log(usr);
      if( nick === usr) {
        this.toast.info('Dishes Ready table: ' + table);
      }
    });
    this.socket.get().on('Beverages Ready', (data) => {
      const nick = this.us.get_nick();
      const usr = data.username;
      const table = data.table;
      console.log(nick);
      console.log(usr);
      if( nick === usr) {
        this.toast.info('Beverages Ready table: ' + table);
      }
    });
   }

   public getTables() {
    this.table.getTables().toPromise().then((tables: Tables[]) => {
      this.tables = tables;
      console.log(tables);

      tables.sort((table1: Tables, table2: Tables) => {
        return table1.tableNumber - table2.tableNumber;
      });

    }).catch((err) => {
      console.log(err);
    });
  }

  ngOnInit() {
    if (this.us.get_token() === undefined || this.us.get_token() === '' || this.us.get_role() !== 2) {
      console.log('Acces Denided');
      this.us.logout();
    }
  }

}
