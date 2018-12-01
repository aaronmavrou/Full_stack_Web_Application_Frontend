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
  
  public collectionsUrl1 = 'comllections/getall';
  public collectionsUrl2 = 'collections/create';
  
  public getCollections(){
    return this.http.get(this.collectionsUrl1);
  };
  
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