import { Injectable } from '@angular/core';
import  {HttpClient,HttpParams, HttpHeaders} from '@angular/common/http'
import { Observable, of } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class CommonService {

  tasktypes =[];

  constructor(private _http :HttpClient) { }

  gettasksTypes():any{
    let taskTypes = ['Hackathon', 'ML Competition','Others'];
    return taskTypes;
  }


}
