import { Component, OnInit } from '@angular/core';
import { UserHttpService } from './../services/user-http.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit {

  private disableButton;
  private errmessage = undefined;
  private role = undefined;

  ngOnInit() {
    this.disableButton = false;
  }

  constructor(private us: UserHttpService, private router: Router) { }

  // ngOnInit() {
  //   this.disableButton = false;
  // }

  login(username: string, password: string){
    // this.disableButton = true;
    this.us.login(username, password).subscribe( (data) => {
      console.log(username + password);
      this.role = this.us.get_role();
      this.errmessage = undefined;
      console.log('Login granted: ' + JSON.stringify(data));
      console.log('User service token: ' + this.us.get_token() );
      switch(this.role){
        case 1 :
          this.router.navigate(['cashier']);
          break;
        case 2 :
          this.router.navigate(['waiter']);
          break;
        case 3 :
          this.router.navigate(['cook']);
          break;
        case 4 :
          this.router.navigate(['bartender']);
          break;
        case 5 :
          this.router.navigate(['client']);
          break;
      }

      // this.router.navigate(['/' + this.role]);
    }, (err) => {
      console.log('Login error: ' + JSON.stringify(err.error.errormessage) );
      // this.errmessage = (err.error) ? err.error.errormessage || err.error.message : err;
      // this.disableButton = false;
    });

  }
}
