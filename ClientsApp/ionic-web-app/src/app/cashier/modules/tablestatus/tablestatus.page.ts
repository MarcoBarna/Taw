import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MenuController } from '@ionic/angular';
import { TableHttpService } from '../../../services/table-http.service';
import { Tables } from 'src/app/models/Tables';
import { SocketioService } from 'src/app/services/socketio.service';
import { UserHttpService } from 'src/app/services/user-http.service';

@Component({
  selector: 'app-tablestatus',
  templateUrl: './tablestatus.page.html',
  styleUrls: ['./tablestatus.page.scss'],
})
export class TablestatusPage implements OnInit {

  private tables: Tables[];
  private role;
  
  constructor(private router: Router,
              public menuCtrl: MenuController,
              private table: TableHttpService,
              private us: UserHttpService,
              private socketio: SocketioService
              ) {
    this.menuCtrl.enable(true);
    this.getTables();
    this.role = this.us.get_role();
    this.socketio.get().on('Cashier', () => {
      this.getTables();
      console.log('Cashier event recived');
    })
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
    if (this.us.get_token() === undefined || this.us.get_token() === '' || this.us.get_role() !== 1) {
      console.log('Acces Denided');
      this.us.logout();
    }
  }

}
