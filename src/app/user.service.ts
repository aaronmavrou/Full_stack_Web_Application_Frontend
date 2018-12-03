import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { HttpHeaders } from '@angular/common/http';
import { AuthService } from './auth/auth.service';

@Injectable({
  providedIn: 'root'
})
export class UserService {
httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json',
    'Authorization': 'my-auth-token'
  })
};

  constructor(private http: HttpClient, private authService: AuthService) { };
  //urls
  public usersUrl1 = 'users/getall';
  public usersUrl2 = 'users/create';
  public usersUrl3 = 'users/delete/';
  public usersUrl4 = 'users/updateUser/';
  
  //get method
  public getUsers(){
    return this.http.get(this.usersUrl1);
  };
  
  //post method
  public postUsers(email2: string, activate2: boolean){
    let fruitObj = {
      "email": email2,
      "isActivated": activate2,
    }
    return this.http.post(this.usersUrl2, fruitObj, this.httpOptions);
  }
  
  //put method
  public putUser(loc: string, activate2: boolean){
    let productObj = {
      "isActivated": activate2
    }
    let jay = this.usersUrl4;
    jay = jay + loc;
    return this.http.put(jay, productObj, this.httpOptions);
  }
  
  //delete method
  public deleteUser(loc: string){
    let jay= this.usersUrl3;
    jay = jay + loc;
    return this.http.delete(jay, this.httpOptions);
  }
  
}
