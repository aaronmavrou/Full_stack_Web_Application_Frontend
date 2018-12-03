import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { HttpHeaders } from '@angular/common/http';
import { AuthService } from './auth/auth.service';

@Injectable({
  providedIn: 'root'
})
export class DmcaService {
  httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json',
    'Authorization': 'my-auth-token'
  })
};

  constructor(private http: HttpClient, private authService: AuthService) { }
  //urls
  public dmcasUrl1 = 'dmcas/getall';
  public dmcasUrl2 = 'dmcas/create';
  public dmcasUrl3 = 'dmcas/updateDmca/';
  
  public getDmcas(){
    return this.http.get(this.dmcasUrl1);
  };
  
  //post method
  public postDmcas(type2: string, info2: string){
    let dmcaObj = {
      "type": type2,
      "info": info2,
    }
    return this.http.post(this.dmcasUrl2, dmcaObj, this.httpOptions);
  };
  
  //put method
  public putDmcas(loc: string, info2: string){
    let dmcaObj = {
      "info": info2,
    }
    let jay = this.dmcasUrl3;
    jay = jay + loc;
    return this.http.put(jay, dmcaObj, this.httpOptions);
  };
  
}
