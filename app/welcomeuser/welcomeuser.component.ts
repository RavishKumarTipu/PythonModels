import { Component, OnInit } from '@angular/core';
import {LoginproviderService} from "../loginprovider.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-welcomeuser',
  templateUrl: './welcomeuser.component.html',
  styleUrls: ['./welcomeuser.component.sass']
})
export class WelcomeuserComponent implements OnInit {

  
  constructor(private _loginService: LoginproviderService, private _Router : Router) { }

  ngOnInit() {
       
  }

  logout()
  {
    console.log("inside logout function");
    this._loginService._loggedUser = null;
    this._loginService.deleteOurCookie();
    this._Router.navigate(["login"]);

  }

  LandingPage()
  {
    console.log("inside landing page function:: " + this._loginService._loggedUser.role );
    this._Router.navigate([this._loginService._loggedUser.role]);
    console.log("routed");
  }
}
