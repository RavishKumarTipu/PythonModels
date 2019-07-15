import { Component, OnInit } from '@angular/core';
import {LoginproviderService} from '../loginprovider.service';
@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.sass']
})
export class AdminComponent implements OnInit {

  constructor(private _loginService : LoginproviderService) { }

  ngOnInit() {
  }

}
