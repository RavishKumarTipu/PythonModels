import { Component, OnInit } from '@angular/core';
import {formElementType} from '../user';
import {HttpClient} from '@angular/common/http';
import {LoginproviderService} from '../loginprovider.service';

@Component({
  selector: 'app-create-f-e-type',
  templateUrl: './create-f-e-type.component.html',
  styleUrls: ['./create-f-e-type.component.css']
})
export class CreateFETypeComponent implements OnInit {

  private _feTypes : formElementType[] = [];
  private _feFilter : formElementType[] = [];
  private _feEdit: formElementType;
  private _feFormType = [{ 'type' :'checkbox'}, {'type' :'select'}, {'type' : 'radio'},{'type' : 'textbox'}, {'type':'textarea'}];
  
  constructor(private _http : HttpClient, private _loginService : LoginproviderService) { }

  ngOnInit() {
      this.getET();
  }

  addET()
  {
    console.log('inside addET function');
    this._feEdit = new formElementType;
  }

  deleteET(et)
  {
    console.log('inside deleteTE function');
    this._loginService.genericPost("http://localhost:6001/api/deleteElementType", et).subscribe
    (
      data => {
          console.log("delete success", data);
      },
      err => {
          console.log('delete failure', err);
      },
      () => {this.getET();}
    );
  }

  //get all element types
  getET()
  {
    console.log("inside getET function");
    this._loginService.genericGet("http://localhost:6001/api/getElementType").subscribe(
      data => {
         console.log("data fetch success", data);
         this._feTypes =  <formElementType[]> data;
         this._feFilter = this._feTypes;
         console.log(this._feTypes);
         this._loginService.updateFooter(0, data); 
        },
      err => {
        this._loginService.updateFooter(1, err);
      }

    );
  }

  //save edited / new element type
  saveET()
  {
    let url = "";
    console.log("_id === ",this._feEdit._id);
    if (this._feEdit._id === undefined)
      url = "http://localhost:6001/api/postElementType";
    else 
      url = "http://localhost:6001/api/postElementTypeUpdate";
   
    console.log("inside edit save",this._feEdit);
    this._loginService.genericPost(url, this._feEdit).subscribe(
        data => {
            console.log('inside Save function', data);
            this._loginService.updateFooter(0,data);
            this.getET();
        },
        err => {
          console.log('inside Save function', err);
          this._loginService.updateFooter(1,err);
        }
    );
  }
  
  editET(e)
  {
    console.log("edit form element type clicked",e);
    this._feEdit = e;
    
  }

  searchItemTypes(searchValue)
  {
    if (searchValue === '')
      this._feFilter = this._feTypes;
    else
    {
        this._feFilter = this._feTypes.filter(({name})=> {return(name.toLowerCase().indexOf( searchValue.toLowerCase()) > -1)});
    }
    console.log("searchvalue", searchValue);
  }
  
  
   
}
