import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { HttpHeaders } from '@angular/common/http';
import { AuthService } from './auth/auth.service';
import { Product } from './shared/product.model';

@Injectable({
  providedIn: 'root'
})
export class ItemInCollectionService {
    
  constructor(private http: HttpClient, private authService: AuthService) { }

  
httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json',
    'Authorization': 'my-auth-token'
  })
};

  public itemsUrl1 = 'items/usingItems';
  public itemsUrl2 = 'items/deleteItem';
  public itemsUrl3 = 'items/updateItem/';
  
  public getItems(){
    return this.http.get(this.itemsUrl1);
  };
  
  public postItems(name2: string, prodName2: string, quantity2: number){
    let itemObj = {
      "name": name2,
      "prodName": prodName2,
      "prodQuantity": quantity2,
    }
    return this.http.post(this.itemsUrl1, itemObj, this.httpOptions);
  }
  
  public putItems(loc: string, name2: string, prodName2: number, quantity2: number){
    let itemObj = {
      "name": name2,
      "prodName": prodName2,
      "prodQuantity": quantity2,
    }
    let jay = this.itemsUrl3;
    jay = jay + loc;
    alert(jay);
    return this.http.put(jay, itemObj, this.httpOptions);
  }
}
