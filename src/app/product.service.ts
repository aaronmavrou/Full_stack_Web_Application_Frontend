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
  
  
  public fruitsUrl1 = 'products/usingProducts';
  public fruitsUrl2 = 'products/deleteProduct/';
  public fruitsUrl3 = 'products/updateProduct/';
  
  public getFruits(){
    return this.http.get(this.fruitsUrl1);
  };
  
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
  
  public putProducts(loc: string, name2: string, price2: number, quantity2: number, description: string, rating: number){
    let productObj = {
      "name": name2,
      "price": price2,
      "quantity": quantity2,
      "myDescription": description,
      "rating": rating
    }
    //loc = loc.substring(1,(i.length-1));
    let jay = this.fruitsUrl3;
    jay = jay + loc;
    alert(jay);

    return this.http.put(jay, productObj, this.httpOptions);

  }
  
  public deleteProduct(loc: string){
    let jay= this.fruitsUrl2;
    jay = jay + loc;
    alert(jay);
    return this.http.delete(jay, this.httpOptions);
  }
  
  
}
