import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { HttpHeaders } from '@angular/common/http';
import { AuthService } from './auth/auth.service';

@Injectable({
  providedIn: 'root'
})
export class CollectionService {
  httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json',
    'Authorization': 'my-auth-token'
  })
};

  constructor(private http: HttpClient, private authService: AuthService) { }
  //urls
  public collectionsUrl1 = 'collections/getall';
  public collectionsUrl2 = 'collections/create';
  
  //get method
  public getCollections(){
    return this.http.get(this.collectionsUrl1);
  };
  
  //post method
  public postCollections(name2: string, theDescription2: string, theVisibility2: boolean, ownerName2: string){
    let collectionObj = {
      "name": name2,
      "theDescription": theDescription2,
      "theVisibility": theVisibility2,
      "ownerName": ownerName2
    }
    return this.http.post(this.collectionsUrl2, collectionObj, this.httpOptions);
  };
}
