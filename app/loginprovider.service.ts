import { Injectable } from '@angular/core';
import {CookieService} from "ngx-cookie-service";
import {user} from "./user";
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {map} from 'rxjs/operators';
@Injectable({
  providedIn: 'root'
})
export class LoginproviderService {

  _loggedUser: user;
  headers =  {
    'Access-Control-Allow-Origin' : '*'/*,
    'Access-Control-Allow-Methods' : 'POST, GET, OPTIONS, PUT',
    'Content-Type': 'application/json',
    'Accept': 'application/json'*/
  };
  options = {
    headers: new HttpHeaders(this.headers)
  };
  constructor(private _cookies : CookieService, private _http: HttpClient) {
      this._loggedUser = new user();
   }

  getTitle(): string {
    return "Ravish Kumar";
  }

  isOurCookieSet() {
    //this._cookies.delete("our_2econd_cookie");
     return(this.fetchUserfromToken(this._cookies.get("our_2econd_cookie")));
  }
  deleteOurCookie(){
    this._cookies.delete("our_2econd_cookie");
  }


  setCookie(): void {
      console.log("login provider : inside setCookie method");
      this._cookies.set("our_2econd_cookie", this._loggedUser.token);
  }


  loginandverify(username: string, password: string)   {
    
      return (this._http.post<user>('https://localhost:5001/api/Login/authenticate/', {username: username, password: password}, this.options));
      
  }

  fetchUserfromToken(token: string)   {
    return (this._http.get<user>('https://localhost:5001/api/Login/getUserFromToken?token=' + token,this.options));
  }

  
}
