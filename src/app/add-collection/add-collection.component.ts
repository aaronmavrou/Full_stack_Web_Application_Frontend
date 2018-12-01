import { Component, OnInit } from '@angular/core';
import { ProductService } from '../product.service';
import { Router, ActivatedRoute } from '@angular/router';
import { AuthService } from '../auth/auth.service';
import { CollectionService } from '../collection.service';
import { Observable } from 'rxjs';
import { ItemInCollectionService } from '../item-in-collection.service';


@Component({
  selector: 'app-add-collection',
  templateUrl: './add-collection.component.html',
  styleUrls: ['./add-collection.component.css']
})
export class AddCollectionComponent implements OnInit {
  
  singleArray: any;
  myproducts: any;
  myquantitys: any;//array we populate every time the click add
  products: any;
  
  
  public visValue: boolean =true;
  public num: number = 1;

  constructor(private productService: ProductService,
              private router: Router,
              private authService: AuthService,
              private collectionService: CollectionService,
              private itemincollectionservice: ItemInCollectionService) {
                
                this.myproducts = [];
                this.myquantitys = [];
                this.singleArray = [];
              }

addCollections(name, description, theval, owner){
  this.collectionService.postCollections(name, description, theval, owner)
    .subscribe((data)=>{
      console.log(data);
  });
};

saveEverything(name1, description1, owner1){
  this.addCollections(name1, description1, this.visValue, owner1);
  for(var i =0; i< this.myproducts.length; i++){
    this.addItemInCollection(name1, this.myproducts[i], this.myquantitys[i]);
  }
  this.leaveHere();
}

leaveHere(){
  this.router.navigate(['afterlogin']);
}

changeBool(){
  if(this.num == 1){
    this.visValue = false;
    this.num = 2;
  }
  else{
    this.visValue = true;
    this.num = 1;
  }
}

addItemInCollection(colName, product, quantity){
  this.itemincollectionservice.postItems(colName, product, quantity)
    .subscribe((data)=>{
      console.log(data);
  });
}

addToCollection(product, quantity){
  this.myproducts.push(product);
  this.myquantitys.push(quantity);
  this.singleArray=[];
  for (var _i = 0; _i < this.myproducts.length; _i++) {
    this.singleArray.push({
                         stat: this.myproducts[_i],
                         bil: this.myquantitys[_i] 
                        });
}
}

showProducts(){
    this.productService.getFruits()
    .subscribe((data)=>{
      console.log(data);
      this.products = [];
      this.products = data;
    });
};

showItems(){
    this.itemincollectionservice.getItems()
    .subscribe((data)=>{
      console.log(data);
      this.myproducts = [];
      this.myproducts = data;
    });
  };

  ngOnInit() {
    this.showProducts();
  }

}
