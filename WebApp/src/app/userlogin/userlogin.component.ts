import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserHttpService } from '../services/users-http-service';

@Component({
  selector: 'app-userlogin',
  templateUrl: './userlogin.component.html',
  styleUrls: ['./userlogin.component.css']
})
export class UserloginComponent implements OnInit {

  private errmessage = undefined;
  private role = undefined;
  private disableButton;

  constructor(private us: UserHttpService, private router: Router) { }

  ngOnInit() {
    this.disableButton = false;
  }

  login(username: string, password: string){
    this.disableButton = true;
    this.us.login(username, password).subscribe( (data) => {
      this.role = this.us.getRole();
      this.errmessage = undefined;
      console.log('Login granted: ' + JSON.stringify(data));
      console.log('User service token: ' + this.us.getToken() );
      // this.router.navigate(['/' + this.role.toLowerCase()])
    }, (err) => {
      console.log('Login error: ' + JSON.stringify(err.error.errormessage) );
      // this.errmessage = (err.error) ? err.error.errormessage || err.error.message : err;
      // this.disableButton = false;
    });
  }

}
