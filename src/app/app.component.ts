import { Component, OnInit } from '@angular/core';
import { ProductService } from './product.service';
import * as firebase from 'firebase';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  providers: [ProductService]
})
export class AppComponent implements OnInit{
  loadedFeature = 'recipe';
  
  ngOnInit(){
    firebase.initializeApp({
      apiKey: "AIzaSyDlwQDUV6wmr4mXaO_oCQyifeQqZVz1G2U",
      authDomain: "ng-product-book.firebaseapp.com"
    })
  }
  
  onNavigate(feature: string){
    this.loadedFeature = feature;
  }
  
  fruits: string[];
  
  constructor(private productService: ProductService){
    //this.showFruits();
  };
  
  showFruits(){
    this.productService.getFruits()
    .subscribe((data)=>{
      console.log(data);
      
      this.fruits = [];
      
      for(var key in data){
        let str = JSON.stringify(data[key].name);
        this.fruits.push(str);
      }
    });
  };
  
  addFruits(newName){
    this.productService.postFruits(newName)
    .subscribe(data => console.log(data));
  };
  
}
