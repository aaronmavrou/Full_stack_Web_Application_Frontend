import { Component, OnInit } from '@angular/core';
import { ProductService } from '../product.service';
import { Router, ActivatedRoute } from '@angular/router';
import { AuthService } from '../auth/auth.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit {

products: any;
productIds: any;

  constructor(private productService: ProductService,
              private router: Router,
              private authService: AuthService) { }

  ngOnInit() {
    this.showProducts();//displays products on page load
  }
  
  //gets the details if button clicked
    getDetails(theid){
    var a= document.getElementById(theid);
    if(a.style.display =="none"){
      a.style.display ="block";
    }else{
      a.style.display = "none";
    }
  }
  
  //gets products from the database
  showProducts(){
    this.productService.getFruits()
    .subscribe((data)=>{
      console.log(data);
      this.products = [];
      this.products = data;
      this.productIds = [];
      
      for(var key in data){
        let str = data[key]._id;
        this.productIds.push(str);
      }
    });
  };
  
  //allows the admin to create a new product with sanitized inputs
  addProducts(newName, newPrice, newQuantity, newDescription){
    newName = this.authService.encodeHTML(newName);
    newPrice = this.authService.encodeHTML(newPrice);
    newQuantity = this.authService.encodeHTML(newQuantity);
    newDescription = this.authService.encodeHTML(newDescription);
    this.productService.postFruits(newName, newPrice, newQuantity, newDescription, 3)
    .subscribe((data)=>{
      this.showProducts();
      console.log(data);
    });
  };
  
  //allows manager to change name of item with sanitized inputs
  changeName(newName, index){
    newName = this.authService.encodeHTML(newName);
    alert(newName + "   " + index);
    this.productService.putProductsName(this.productIds[index], newName)
      .subscribe((data)=>{
      this.showProducts();
    });
  }
  
  //allows manager to change description of item with sanitized input
  changeDesc(newDesc, index){
    newDesc = this.authService.encodeHTML(newDesc);
    alert(newDesc + "   " + index);
    this.productService.putProductsDescription(this.productIds[index], newDesc)
      .subscribe((data)=>{
      this.showProducts();
    });
  }
  
  //allows manager to delete a product
    deleteProd(index){
    this.productService.deleteProduct(this.productIds[index])
    .subscribe((data)=>{
      console.log(data);
      this.showProducts();
    })
  }
  
  //allows the manager to change quantity of items in stock
  changeQuantity(newQuantity, index){
    alert(newQuantity + "   " + index);
      this.productService.putProductsQuantity(this.productIds[index], newQuantity)
      .subscribe((data)=>{
      this.showProducts();
    });
  }
  
  //allows the manager to change the price of an item
  changePrice(newPrice, index){
    alert(newPrice + "   " + index);
      this.productService.putProductsPrice(this.productIds[index], newPrice)
      .subscribe((data)=>{
      this.showProducts();
    });
  }

}
