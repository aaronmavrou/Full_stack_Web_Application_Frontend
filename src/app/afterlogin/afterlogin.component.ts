import { Component, OnInit } from '@angular/core';
import { ProductService } from '../product.service';
import { Router, ActivatedRoute } from '@angular/router';
import { AuthService } from '../auth/auth.service';
import { CommentService } from '../comment.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-afterlogin',
  templateUrl: './afterlogin.component.html',
  styleUrls: ['./afterlogin.component.css']
})
export class AfterloginComponent implements OnInit {
  
  products: any;
  comments: any;
  idArray: any;
  
  constructor(private productService: ProductService,
              private router: Router,
              private authService: AuthService,
              private commentService: CommentService) { }

  ngOnInit() {
    this.showProducts();
  }
  
  callPut(){
    this.productService.putProducts(this.idArray[1], 'joe', 4, 3, 'hillbilly', 4)
    .subscribe((data)=>{
      console.log(data);
      this.showProducts();
    })
  }
  
  makeCollection(){
    this.router.navigate(['add-collection']);
  }
  
  deleteProduct(){
    this.productService.deleteProduct(this.idArray[1])
    .subscribe((data)=>{
      console.log(data);
      this.showProducts();
    })
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
      this.idArray=[];
      this.products = data;
       for(var key in data){
        let str = (data[key]._id);
        this.idArray.push(str);
      }
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

}
