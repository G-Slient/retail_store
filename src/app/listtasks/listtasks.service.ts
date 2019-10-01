import { Injectable } from '@angular/core';
import  {HttpClient,HttpParams} from '@angular/common/http'
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ListtasksService {

  constructor(private _http :HttpClient) { }

  
  loadTaskDetails():Observable<any>{
    return this._http.get("/retrieve")
  }

}
