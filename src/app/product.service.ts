import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { HttpHeaders } from '@angular/common/http';
import { AuthService } from './auth/auth.service';

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
  
  public fruitsUrl1 = 'products/getall';
  public fruitsUrl2 = 'products/create';
  public fruitsUrl3 = 'products/delete';
  public fruitsUrl4 = 'products/update';
  
  public getFruits(){
    return this.http.get(this.fruitsUrl1);
  };
  
  public postFruits(name2: string){
    let fruitObj = {
      "name": name2,
      "price": 10,
      "quantity": 10,
      "taxRate": 0,
    }
    return this.http.post(this.fruitsUrl2, fruitObj, this.httpOptions);
  }
}
