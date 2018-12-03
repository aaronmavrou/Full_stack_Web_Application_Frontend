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
  //urls
  public commentsUrl1 = 'comments/getall';
  public commentsUrl2 = 'comments/create';
  public commentsUrl3 = 'comments/updateComment/';
  
  //get method
  public getComments(){
    return this.http.get(this.commentsUrl1);
  };
  
  //post method
  public postComments(name2: string, product2: string, rating2: number, comment2: string, vis2: boolean){
    let commentObj = {
      "name": name2,
      "theProduct": product2,
      "rating": rating2,
      "comment": comment2,
      "thevis": vis2,
    }
    return this.http.post(this.commentsUrl2, commentObj, this.httpOptions);
  }
  
  //put method
  public putComments(loc: string, vis2: boolean){
    let commentObj = {
      "thevis": vis2,
    }
    let jay = this.commentsUrl3;
    jay = jay + loc;
    return this.http.put(jay, commentObj, this.httpOptions);
  }
  
}
