import { Component, OnInit } from '@angular/core';
import {footermsg} from '../user';
import {LoginproviderService} from '../loginprovider.service';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.css']
})
export class FooterComponent implements OnInit {

  constructor(private _loginService : LoginproviderService) { }

  ngOnInit() {
  }

}
