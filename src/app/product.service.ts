import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { HttpHeaders } from '@angular/common/http';
import { AuthService } from './auth/auth.service';
import { Product } from './shared/product.model';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json',
    'Authorization': 'my-auth-token'
  })
};

  constructor(private http: HttpClient, private authService: AuthService) { };
  
  //urls
  public fruitsUrl1 = 'products/usingProducts';
  public fruitsUrl2 = 'products/deleteProduct/';
  public fruitsUrl3 = 'products/updateProduct/';
  
  //get method
  public getFruits(){
    return this.http.get(this.fruitsUrl1);
  };
  
  //post method
  public postFruits(name2: string, price2: number, quantity2: number, description: string, rating: number){
    let fruitObj = {
      "name": name2,
      "price": price2,
      "quantity": quantity2,
      "myDescription": description,
      "rating": rating,
    }
    return this.http.post(this.fruitsUrl1, fruitObj, this.httpOptions);
  }
  
  //put method
  public putProductsName(loc: string, name2: string){
    let productObj = {
      "name": name2
    }
    let jay = this.fruitsUrl3;
    jay = jay + loc;
    return this.http.put(jay, productObj, this.httpOptions);
  }
  
  //put method
  public putProductsPrice(loc: string, price2: number){
    let productObj = {
      "price": price2
    }
    let jay = this.fruitsUrl3;
    jay = jay + loc;
    return this.http.put(jay, productObj, this.httpOptions);
  }
  
  //put method
  public putProductsQuantity(loc: string,  quantity2: number){
    let productObj = {
      "quantity": quantity2
    }
    let jay = this.fruitsUrl3;
    jay = jay + loc;
    return this.http.put(jay, productObj, this.httpOptions);
  }
  
    //put method
  public putProductsDescription(loc: string, description: string){
    let productObj = {
      "myDescription": description
    }
    let jay = this.fruitsUrl3;
    jay = jay + loc;
    return this.http.put(jay, productObj, this.httpOptions);
  }
  
  //delete method
  public deleteProduct(loc: string){
    let jay= this.fruitsUrl2;
    jay = jay + loc;
    alert(jay);
    return this.http.delete(jay, this.httpOptions);
  }
  
  
}
