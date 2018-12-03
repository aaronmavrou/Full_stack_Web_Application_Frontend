import { Component, OnInit } from '@angular/core';
import { ProductService } from '../product.service';
import { Router, ActivatedRoute } from '@angular/router';
import { AuthService } from '../auth/auth.service';
import { CollectionService } from '../collection.service';
import { Observable } from 'rxjs';
import { ItemInCollectionService } from '../item-in-collection.service';

@Component({
  selector: 'app-my-collection',
  templateUrl: './my-collection.component.html',
  styleUrls: ['./my-collection.component.css']
})
export class MyCollectionComponent implements OnInit {

  collections: any;
  myproducts: any;
  collectionIds: any;

  constructor(private productService: ProductService,
              private router: Router,
              private authService: AuthService,
              private collectionService: CollectionService,
              private itemincollectionservice: ItemInCollectionService) { }

//reroutes to homepage
goBack(){
    this.router.navigate(['afterlogin']);
  }

  ngOnInit() {
    this.showCollections();
  }
  
  //displays collection details on click
getDetails(theid){
    var a= document.getElementById(theid);
    if(a.style.display =="none"){
      a.style.display ="block";
    }else{
      a.style.display = "none";
    }
  }

//shows all the collections
  showCollections(){
    this.collectionService.getCollections()
    .subscribe((data)=>{
      console.log(data);
      this.collections = [];
      this.collections = data;
      this.collectionIds = [];
      for(var key in data){
        let str = data[key]._id;
        this.collectionIds.push(str);
      }
      this.showItems();
    });
};

  
  //allows user to delete their collection
  deleteCollection(index){
    this.collectionService.deleteCollection(this.collectionIds[index])
    .subscribe((data)=>{
      console.log(data);
      this.showCollections();
    })
  }

//shows all the items in a collection 
showItems(){
    this.itemincollectionservice.getItems()
    .subscribe((data)=>{
      console.log(data);
      this.myproducts = [];
      this.myproducts = data;
    });
  };
  

}
