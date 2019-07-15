import { Component, OnInit } from '@angular/core';
import {LoginproviderService} from '../loginprovider.service';
import {message, pymodel} from '../user';
@Component({
  selector: 'app-py-models',
  templateUrl: './py-models.component.html',
  styleUrls: ['./py-models.component.css']
})
export class PyModelsComponent implements OnInit {
  _result :message = {success : false, msg : ''};
  _temp_result :message = {success : false, msg : ''};
  _models : pymodel[];
  _editmodel : pymodel;
  _images: string[];
  constructor(private _loginService : LoginproviderService) {
     
   }

  ngOnInit() {
      this.fetchModels();
  }

  addPy(){
    this._loginService.updateFooter(1, {'success' :false, 'msg' :'adding new model...'});
    this._result = this._temp_result;
    this._editmodel = {'name' : '', 'path' : '', 'code' : '', 'arguments': null};
    this._loginService.updateFooter(0, {'success' :true, 'msg' :'new model added...'});
  }
  editPy(m)
  {
    this._loginService.updateFooter(1, {'success' :false, 'msg' :'editing existing model...'});
    this._result = this._temp_result;
    this._editmodel = m;
    this._loginService.updateFooter(0, {'success' :true, 'msg' :'editing existing model...'}); 
  }
  fetchModels()
  {
    this._loginService.updateFooter(1, {'success' :false, 'msg' :'saving model...'});
    this._loginService.genericGet('http://localhost:6001/python/fetchModels').subscribe(
       data => {
          this._models = <pymodel[]> data;
          console.log('inside fetchModels :', this._models);
          this._loginService.updateFooter(0, {'success' :true, 'msg' :'model saved.'});
       },
       err => { console.log('inside fetchModels :', err);
       this._loginService.updateFooter(2, {'success' :false, 'msg' :err});
      }
    );

  }
  runPy(p)
  {
    this._result = this._temp_result;
    this._loginService.updateFooter(1, {'success' :false, 'msg' :'executing model....'});
    this._loginService.genericPost('http://localhost:6001/python/triggerPy',{'path':p.path} ).subscribe(

      data => {console.log('1 result of model run :',data);
          this._result  = <message> data[0] ;  
          this._editmodel.arguments = [];
          this._editmodel.arguments = data[1];
          this._images = this._editmodel.arguments.map(a => "http://localhost:6001/python/getImage/"+ a + "?" + Date.now());
         // this.showModelImages(this._editmodel.arguments);
          console.log('edit model arguments', this._editmodel.arguments);
          this._loginService.updateFooter(0, {'success' :true, 'msg' :'model execution complete...'});
      },
      err => {console.log('1 error :',err);
      this._result  = <message> err ;
      console.log('this._result', this._result);  
      this._loginService.updateFooter(2, {'success' :false, 'msg' :err});
    },
    );
  }

  showModelImages(ars)
  {
      if (ars != null)
      {
        for(var item, i=0; item = ars[i++];)
        {
          window.open("http://localhost:6001/python/getImage/" + item, item, "height=200,width=200,status=no,toolbar=no,location=no,titlebar=no");
        }
      }
  }

  savePy(p)
  {
    this._loginService.updateFooter(1, {'success' :false, 'msg' :'saving model...'});
    this._loginService.genericPost('http://localhost:6001/python/savePy',p).subscribe(
      data => {
          console.log('inside savePy', p);
          this._editmodel = <pymodel> data;
          this._loginService.updateFooter(0, {'success' :true, 'msg' :'model saved...'});
          this._result = this._temp_result;
          this.fetchModels();
          
      },
      err => {
          console.log('inside savePy',err);
          this._loginService.updateFooter(2, {'success' :false, 'msg' :err});
      }
    );
  }


  fetchUrl(u)
{
  console.log('inside fetchUrl','http://localhost:6001/python/getImage/' + u + '?' +  Date.now());
  return('http://localhost:6001/python/getImage/' + u + '?' +  Date.now());
}
}


