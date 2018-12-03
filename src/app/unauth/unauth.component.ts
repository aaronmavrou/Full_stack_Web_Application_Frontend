import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth/auth.service';
import { Router, ActivatedRoute } from '@angular/router';
import {ProductService } from '../product.service';

@Component({
  selector: 'app-unauth',
  templateUrl: './unauth.component.html',
  styleUrls: ['./unauth.component.css']
})
export class UnauthComponent implements OnInit {

  constructor(private authService: AuthService,
              private router: Router,
              private productService: ProductService) { }
 products: any;
 //allows user to route to view entire inventory
goBrowse(){
    this.router.navigate(['product-list']);
  }
  
  //displays all products 
  showProducts(){
    this.productService.getFruits()
    .subscribe((data)=>{
      console.log(data);
      this.products = [];
      this.products = data;
    });
  };
  
  //displays list of products
  ngOnInit() {
    this.showProducts();
  }
  
}

