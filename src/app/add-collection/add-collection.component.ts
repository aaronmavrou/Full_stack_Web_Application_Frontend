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
  
  public visValue: boolean =true;
  public num: number = 1;

  constructor(private productService: ProductService,
              private router: Router,
              private authService: AuthService,
              private collectionService: CollectionService,
              private itemincollectionservice: ItemInCollectionService) { }

addCollections(name, description, owner){
  this.collectionService.postCollections(name, description, this.visValue, owner)
    .subscribe((data)=>{
      ;
  });
};

showValue(value){
  alert(this.visValue);
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


  ngOnInit() {
  }

}
