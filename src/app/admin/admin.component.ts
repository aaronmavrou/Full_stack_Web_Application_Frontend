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
    this.showProducts();
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
      this.productIds = [];
      
      for(var key in data){
        let str = data[key]._id;
        this.productIds.push(str);
      }
    });
  };
  
  addProducts(newName, newPrice, newQuantity, newDescription){
    this.productService.postFruits(newName, newPrice, newQuantity, newDescription, 3)
    .subscribe((data)=>{
      this.showProducts();
      console.log(data);
    });
  };
  
  changeName(newName, index){
    alert(newName + "   " + index);
    this.productService.putProductsName(this.productIds[index], newName)
      .subscribe((data)=>{
      this.showProducts();
    });
  }
  
  changeDesc(newDesc, index){
    alert(newDesc + "   " + index);
    this.productService.putProductsDescription(this.productIds[index], newDesc)
      .subscribe((data)=>{
      this.showProducts();
    });
  }
  
    deleteProd(index){
    this.productService.deleteProduct(this.productIds[index])
    .subscribe((data)=>{
      console.log(data);
      this.showProducts();
    })
  }
  
  changeQuantity(newQuantity, index){
    alert(newQuantity + "   " + index);
      this.productService.putProductsQuantity(this.productIds[index], newQuantity)
      .subscribe((data)=>{
      this.showProducts();
    });
  }
  
  changePrice(newPrice, index){
    alert(newPrice + "   " + index);
      this.productService.putProductsPrice(this.productIds[index], newPrice)
      .subscribe((data)=>{
      this.showProducts();
    });
  }

}
