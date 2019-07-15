import { Component, OnInit } from '@angular/core';
import {LoginproviderService} from './loginprovider.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit{
  title = 'Mancer EMR Services';

  constructor(private _loginService: LoginproviderService, private _router : Router) {
      
  }

  ngOnInit(){
      this._loginService._loggedUser = null;
      this._loginService.isOurCookieSet().subscribe(

        data => {
              this._loginService._loggedUser = data;
              console.log("fetched user from token ::" , this._loginService._loggedUser);
              if(this._loginService._loggedUser != null)
              {
                    this._router.navigate(["welcome"]);
              }
              else 
              {
                  this._router.navigate(["login"]);
              }
        },
        err => {
              console.log("error fetching user from token ::" + err.error);
              this._router.navigate(["login"]);
        },
    
        () => {
    
        }
    
        );
        return true;
      }
         
  }


