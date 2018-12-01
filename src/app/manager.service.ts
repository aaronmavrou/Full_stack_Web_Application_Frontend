import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { HttpHeaders } from '@angular/common/http';
import { AuthService } from './auth/auth.service';

@Injectable({
  providedIn: 'root'
})
export class ManagerService {
httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json',
    'Authorization': 'my-auth-token'
  })
};

  constructor(private http: HttpClient, private authService: AuthService) { };
  
  
  public managersUrl1 = 'managers/create';
  public managersUrl2 = 'managers/delete/';
  public managersUrl3 = 'managers/getall';
  
  public getManagers(){
    return this.http.get(this.managersUrl3);
  };
  
  public postManagers(email2: string){
    let managerObj = {
      "email": email2,
    }
    return this.http.post(this.managersUrl1, managerObj, this.httpOptions);
  }
  
  public deleteManager(loc: string){
    let jay= this.managersUrl2;
    jay = jay + loc;
    alert(jay);
    return this.http.delete(jay, this.httpOptions);
  }
}
