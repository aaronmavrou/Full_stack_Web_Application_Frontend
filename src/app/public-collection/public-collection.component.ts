import { Component, OnInit } from '@angular/core';
import { ProductService } from '../product.service';
import { Router, ActivatedRoute } from '@angular/router';
import { AuthService } from '../auth/auth.service';
import { CollectionService } from '../collection.service';
import { Observable } from 'rxjs';
import { ItemInCollectionService } from '../item-in-collection.service';

@Component({
  selector: 'app-public-collection',
  templateUrl: './public-collection.component.html',
  styleUrls: ['./public-collection.component.css']
})
export class PublicCollectionComponent implements OnInit {

  constructor(private productService: ProductService,
              private router: Router,
              private authService: AuthService,
              private collectionService: CollectionService,
              private itemincollectionservice: ItemInCollectionService) { }


  collections: any;
  myproducts: any;
  
  ngOnInit() {
    this.showCollections();
  }
//reroutes to homepage
goBack(){
    this.router.navigate(['afterlogin']);
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
      this.showItems();
    });
};

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
