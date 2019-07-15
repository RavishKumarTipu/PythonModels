import { Component, OnInit, Input } from '@angular/core';
import {action} from '../user';
@Component({
  selector: 'app-action',
  templateUrl: './action.component.html',
  styleUrls: ['./action.component.css']
})
export class ActionComponent implements OnInit {

  private _action: action ;
  
  @Input ()
  set action(action: action)
  {
    this._action = action;
  }
  constructor() { }

  ngOnInit() {
  }

}
