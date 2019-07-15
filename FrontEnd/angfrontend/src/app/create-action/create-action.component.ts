import { Component, OnInit } from '@angular/core';
import {LoginproviderService} from '../loginprovider.service';
import {user, action} from '../user';

@Component({
  selector: 'app-create-action',
  templateUrl: './create-action.component.html',
  styleUrls: ['./create-action.component.css']
})
export class CreateActionComponent implements OnInit {

  displayedColumns : string[] = ['edit','role','action','description', 'parent','link', 'menuitem'];

  constructor(private _loginService: LoginproviderService) { }
  ngOnInit() {
       this.getActions();
   
  }

  getActions()
  {
    console.log('inside createAction Component fetch actions');
    this._loginService.fetchActions().subscribe  (

      data => {
        this._loginService._actions = data;
        console.log(this._loginService._actions);
      },
      err => { console.log(err.error.message)},
      () => {}
    );

  }

}
