import { Component, OnInit } from '@angular/core';
import { ProductService } from '../product.service';
import { Router, ActivatedRoute } from '@angular/router';
import { AuthService } from '../auth/auth.service';
import { CommentService } from '../comment.service';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css'],
  providers: [ProductService]
})
export class ProductListComponent implements OnInit {

  constructor(private productService: ProductService,
              private router: Router,
              private authService: AuthService,
              private commentService: CommentService) { }
  
  products: any;
  comments: any;
  
  goBack(){
    this.router.navigate(['unauth']);
  }

  ngOnInit() {
  }
  
  getDetails(theid){
    var a= document.getElementById(theid);
    if(a.style.display =="none"){
      a.style.display ="block";
    }else{
      a.style.display = "none";
    }
  }

  showProducts(){
    this.productService.getFruits()
    .subscribe((data)=>{
      console.log(data);
      this.products = [];
      this.products = data;
      this.showComments();
    });
  };
  
  showComments(){
    this.commentService.getComments()
    .subscribe((data)=>{
      console.log(data);
      this.comments = [];
      this.comments = data;
    });
  };
  
  addProducts(newName, newPrice, newQuantity, newDescription, newRating){
    this.productService.postFruits(newName, newPrice, newQuantity, newDescription, newRating)
    .subscribe(data => console.log(data));
  };
  

}
