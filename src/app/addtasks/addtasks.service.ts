import { Injectable } from '@angular/core';
import  {HttpClient,HttpParams} from '@angular/common/http'
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AddtasksService {

  constructor(private _http :HttpClient) { }

  gettasktypes(data:any): Observable<any>{
    return this._http.post('/gettasktypes',data)
  }

  gettaskwebsites(data:any): Observable<any>{
    return this._http.post('/gettaskwebsites',data)
  }

  saveTask(task:any): Observable<any>{
    console.log("add service",task)
    return this._http.post('/savetask',task)
    }


}
