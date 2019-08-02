import { Component } from '@angular/core';
// import { UserHttpService } from '../services/users-http-service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {
  
  // private errmessage = undefined;
  // private role = undefined;
  // private disableButton;

  // constructor(private us: UserHttpService, private router: Router) { }

  // // ngOnInit() {
  // //   this.disableButton = false;
  // // }

  // login(username: string, password: string){
  //   // this.disableButton = true;
  //   this.us.login(username, password).subscribe( (data) => {
  //     this.role = this.us.getRole();
  //     this.errmessage = undefined;
  //     console.log('Login granted: ' + JSON.stringify(data));
  //     console.log('User service token: ' + this.us.getToken() );
  //     // this.router.navigate(['/' + this.role.toLowerCase()])
  //   }, (err) => {
  //     console.log('Login error: ' + JSON.stringify(err.error.errormessage) );
  //     // this.errmessage = (err.error) ? err.error.errormessage || err.error.message : err;
  //     // this.disableButton = false;
  //   });

  // }
}
