import { Injectable } from '@angular/core';
import {CookieService} from "ngx-cookie-service";
import {user, action, message, footermsg} from "./user";
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {map} from 'rxjs/operators';
import { Observable } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class LoginproviderService {

  _loggedUser: user;
  _actions : action[];
  _action_message: message = { 'success': false, 'msg': "waiting for data..."};

  //to be used in footer
  _footer_data : footermsg;

  headers =  {
    'Access-Control-Allow-Origin' : '*',
    'Access-Control-Allow-Methods' : 'POST, GET, OPTIONS, PUT',
    'Content-Type': 'application/json',
    'Accept': 'application/json'
  };
  options = {
    headers: new HttpHeaders(this.headers)
  };
  constructor(private _cookies : CookieService, private _http: HttpClient) {
      this._loggedUser = new user();
      this._footer_data = new footermsg();

      this._footer_data.message = new message();
      this._footer_data.callstatus = 1;
      this._footer_data.message.success = true;
      this._footer_data.message.msg = "footer message would come here !";
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

  fetchActions()   {
    return (this._http.get <action[]>('https://localhost:5001/api/Login/getActions',this.options));
  }

  addUpdateActions(url : string, data : action)   {
    return (this._http.post <message>(url, data, this.options));
  }
  //either add a new action or update it
  takeCareOfAction(action: action) 
  {
    var returnMsg : message = {success: false, msg: ""};
     let url : string = "";
     
     if (action._id === "")
            url = 'https://localhost:5001/api/Login/addAction';
     else 
           url = 'https://localhost:5001/api/Login/updateAction';
     
     this.addUpdateActions( url, action).subscribe(

        data => { 
          this.fetchActions().subscribe(
            data => {
               this._actions = data;
               returnMsg.success = true;
               returnMsg.msg = "The action add / update operation was successful ! ";
               this._action_message = returnMsg;
                this.isOurCookieSet().subscribe(
                    data => {this._loggedUser = data;},
                    err => {
                          returnMsg.success= false; returnMsg.msg = err;
                          this._action_message = returnMsg;  
                    }
                );             
               },
            err => {
              returnMsg.success = false;
              returnMsg.msg = err;
              this._action_message = returnMsg;
            } 
          );
          
        },
        err => {
          returnMsg.success = false;
          returnMsg.msg = err;
          this._action_message = returnMsg;
        } 
       
      )
       
  }

  //a generic http request to be made in all components
  genericPost(url, data)  
  {  
    //this.updateFooter(1, {'success' :false, 'msg' :'posting to ' + url});
    return(this._http.post(url, data, this.options));
  }

  genericGet(url)  
  {
      //this.updateFooter(1, {'success' :false, 'msg' : 'getting from ' + url});
      return(this._http.get(url, this.options));
  }
  //helper function for footer update
  updateFooter(callstatus, data)
  {
      this._footer_data.callstatus = callstatus;
      this._footer_data.message = data; 
    }
}
