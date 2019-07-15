import { Component, OnInit } from '@angular/core';
import {LoginproviderService} from '../loginprovider.service';
import {first} from 'rxjs/operators';
import {Observable} from 'rxjs';
import {user} from '../user';
import {Router} from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.sass']
})
export class LoginComponent implements OnInit {

  username: string;
  password: string;
  rememberme: boolean;
  errmsg: string;
  blnSuccess: boolean;
  constructor(private _loginprovider : LoginproviderService, private _router : Router) { }

  ngOnInit() {
    this.username = "jyotsna";
    this.password = "jyotsna";
    this.errmsg = "";
    this.blnSuccess = false;
    this.rememberme = true;
  }

  validateuser() {
      this._loginprovider.loginandverify(this.username, this.password).subscribe(
        data => { 
          this.blnSuccess = true;
           this._loginprovider._loggedUser = data; 
           this.errmsg="** login successful !"; 
           console.log(this._loginprovider._loggedUser);
           console.log("remember me : " + this.rememberme);
           if(this.rememberme)
              this._loginprovider.setCookie();
           this._router.navigate([this._loginprovider._loggedUser.role]);
          },
        err => {
          this.blnSuccess=false; console.log("error::" + err.error.message + " status :: " + err.status) ; 
          this.errmsg = "**"+ err.error.message ;
        },
        () => {console.log("authentication complete")}

      );
       
  }

}
