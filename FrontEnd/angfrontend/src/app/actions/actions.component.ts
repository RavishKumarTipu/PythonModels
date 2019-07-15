import { Component, OnInit, Input } from '@angular/core';
import {action, message} from '../user';
import {LoginproviderService} from '../loginprovider.service';
import { stringify } from 'querystring';
@Component({
  selector: 'app-actions',
  templateUrl: './actions.component.html',
  styleUrls: ['./actions.component.css']
})
export class ActionsComponent implements OnInit {
  private _roles = [{'id': 0 ,'role' : 'admin'},{'id':2,'role' :'user'}]; 
  private _parents= [];
  
  constructor(private _loginService : LoginproviderService) { }

  ngOnInit() {
    
    this.pullUniqueParents();
  }

  pullMaxFromActions()
  {
    let max=0;
    if(this._loginService._actions != null)
    {
    for(var item,i=0; item = this._loginService._actions[i++];)
    {
      if (max < item.action)
        max = item.action; 
    }
  }
    return (max+1);
  }

  pullUniqueParents()
  {
    this._parents = [];
    var lookup = {};
    
    if(this._loginService._actions !=null)
    {
      this._parents.push(0);
      i: Number;  
      for(var item ,  i=0; item = this._loginService._actions[i++];)
      {
        if (!(item.action in this._parents) )
        {
          //lookup[item.action] =1;
          this._parents.push(item.action);

        }

      }
    }
    console.log('parents');
    console.log(this._parents);
    console.log('actions:', this._loginService._actions);
  }
  addAction()
  {
    console.log(this._loginService._actions);
    let  a:action  = {'_id': '', 'role' :'admin', 'action' : this.pullMaxFromActions(), 'description': 'new action', 'link':'', 'menuitem':'','parent':0, 'childactions':null };
    this._loginService._actions.push(a);
    this.pullUniqueParents();
    
  }

  saveAction(_actionToSave)
  {
    console.log('action to save');
    console.log(_actionToSave);
    
    this._loginService.takeCareOfAction(_actionToSave);
     
  }

}
