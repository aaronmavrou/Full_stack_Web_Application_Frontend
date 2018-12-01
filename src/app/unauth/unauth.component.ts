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

goBrowse(){
    this.router.navigate(['product-list']);
  }
  
  showProducts(){
    this.productService.getFruits()
    .subscribe((data)=>{
      console.log(data);
      this.products = [];
      this.products = data;
    });
  };
  
  ngOnInit() {
    this.showProducts();
  }

}
