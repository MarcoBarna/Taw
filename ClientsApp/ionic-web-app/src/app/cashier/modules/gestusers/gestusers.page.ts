import { Component, OnInit } from '@angular/core';
import { MenuController } from '@ionic/angular';
import { Router } from '@angular/router';
import { UserHttpService } from 'src/app/services/user-http.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-gestusers',
  templateUrl: './gestusers.page.html',
  styleUrls: ['./gestusers.page.scss'],
})
export class GestusersPage implements OnInit {

  userName: string;
  passUser: string;
  roleUser: string;

  constructor(private router: Router,  public menuCtrl: MenuController, private us: UserHttpService, private toast: ToastrService) {
    this.menuCtrl.enable(true);
  }

  ngOnInit() {
    if (this.us.get_token() === undefined || this.us.get_token() === '' || this.us.get_role() !== 1) {
      console.log('Acces Denided');
      this.us.logout();
    }
  }

  addUser(username: string, password: string, role: number) {
    const user = {
      username,
      password,
      role
    };
    this.us.register(user).toPromise().then(data => {
      console.log(data);
      this.toast.success('User added successfully');
    })
    .catch(err => {
      console.log(err);
      this.toast.error(err.error);
    });
    this.userName = '';
    this.passUser = '';
    this.roleUser = '';
  }

}
