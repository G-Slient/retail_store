import { Injectable } from '@angular/core';
import  {HttpClient,HttpParams} from '@angular/common/http'
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class PasttasksService {
  constructor(private _http :HttpClient) { }

  
  loadpastTaskDetails():Observable<any>{
    return this._http.get("/retrieverules")
  }
}
