import { Component, Input, ViewChild, OnInit } from '@angular/core';
import {Router} from '@angular/router';

@Component({
  selector: 'app-menu-item',
  templateUrl: './menu-item.component.html',
  styleUrls: ['./menu-item.component.css']
})
export class MenuItemComponent implements OnInit {

  @Input() items : string;
  @ViewChild('childMenu' , {static :true}) public childMenu;
  
  constructor(public router : Router) { }

  ngOnInit() {
  }

}
