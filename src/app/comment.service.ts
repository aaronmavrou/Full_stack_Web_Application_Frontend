import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { HttpHeaders } from '@angular/common/http';
import { AuthService } from './auth/auth.service';

@Injectable({
  providedIn: 'root'
})
export class CommentService {
  httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json',
    'Authorization': 'my-auth-token'
  })
};

  constructor(private http: HttpClient, private authService: AuthService) { }
  
  public commentsUrl1 = 'comments/getall';
  public commentsUrl2 = 'comments/create';
  
  public getComments(){
    return this.http.get(this.commentsUrl1);
  };
  
  // public postProducts(name2: string, price2: number, quantity2: number){
  //   let fruitObj = {
  //     "name": name2,
  //     "price": price2,
  //     "quantity": quantity2,
  //   }
  //   return this.http.post(this.fruitsUrl2, fruitObj, this.httpOptions);
  // }
  
}
