import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { HttpHeaders } from '@angular/common/http';
import { AuthService } from './auth/auth.service';

@Injectable({
  providedIn: 'root'
})
export class CartService {

httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json',
    'Authorization': 'my-auth-token'
  })
};

  constructor(private http: HttpClient, private authService: AuthService) { };
  
  public cartsUrl1 = 'carts/getall';
  public cartsUrl2 = 'carts/create';
  public cartsUrl3 = 'carts/updateCart/';
  public cartsUrl4 = 'carts/delete/';
  
  public getCart(){
    return this.http.get(this.cartsUrl1);
  };
  
  public postCart(name2: string, price2: number, quantity2: number){
    let cartObj = {
      "name": name2,
      "price": price2,
      "quantity": quantity2,
    }
    return this.http.post(this.cartsUrl2, cartObj, this.httpOptions);
  }
  
  public putCartsQuantity(loc: string,  quantity2: number){
    let cartObj = {
      "quantity": quantity2
    }
    let jay = this.cartsUrl3;
    jay = jay + loc;
    return this.http.put(jay, cartObj, this.httpOptions);
  }
  
  public putCartsPrice(loc: string,  price2: number){
    let cartObj = {
      "price": price2
    }
    let jay = this.cartsUrl3;
    jay = jay + loc;
    return this.http.put(jay, cartObj, this.httpOptions);
  }
  
  public deleteCartProduct(loc: string){
    let jay= this.cartsUrl4;
    jay = jay + loc;
    return this.http.delete(jay, this.httpOptions);
  }
  
}
