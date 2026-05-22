import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment.development';

@Injectable({
  providedIn: 'root'
})
export class Api {

  constructor(private _http:HttpClient) { }

  getNotices(){
    return this._http.get(`${environment.apiUrl}/notice`)
  }

  getEvents(){
    return this._http.get(`${environment.apiUrl}/event`)
  }
}
