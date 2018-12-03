import { Component, OnInit } from '@angular/core';
import { ProductService } from '../product.service';
import { Router, ActivatedRoute } from '@angular/router';
import { AuthService } from '../auth/auth.service';
import { CommentService } from '../comment.service';
import { Observable } from 'rxjs';
import { CartService } from '../cart.service';

@Component({
  selector: 'app-afterlogin',
  templateUrl: './afterlogin.component.html',
  styleUrls: ['./afterlogin.component.css']
})
export class AfterloginComponent implements OnInit {
  
  itemIdArray: any;
  cartItems: any;
  products: any;
  comments: any;
  idArray: any;
  totalPrice: number;
  
  constructor(private productService: ProductService,
              private router: Router,
              private authService: AuthService,
              private commentService: CommentService,
              private cartService: CartService) { }

  ngOnInit() {
    this.showProducts();
    this.showCart();
  }
  
  callPut(index, lequantity){
    this.productService.putProductsQuantity(this.idArray[index], lequantity)
    .subscribe((data)=>{
      console.log(data);
    })
  }
  
  makeCollection(){
    this.router.navigate(['add-collection']);
  }
  
  viewCollections(){
    this.router.navigate(['public-collection']);
  }
  
  deleteProduct(){
    this.productService.deleteProduct(this.idArray[1])
    .subscribe((data)=>{
      console.log(data);
      this.showProducts();
    })
  }
  
  makeReview(){
    this.router.navigate(['addcomment']);
  }
  
  getDetails(theid){
    var a= document.getElementById(theid);
    if(a.style.display =="none"){
      a.style.display ="block";
    }else{
      a.style.display = "none";
    }
  }
  
  showCart(){
    this.cartService.getCart()
    .subscribe((data)=>{
      console.log(data);
      this.itemIdArray = [];
      this.cartItems=[];
      this.cartItems = data;
       for(var key in data){
        let str = (data[key]._id);
        this.itemIdArray.push(str);
      }
      this.getTotal();
  });
  }
  
  addTheItem(newName, newPrice, quantity){
    if(quantity == 0){
      alert("Cannot add item to cart because there is not enough stock");
    }
    else{
    this.cartService.postCart(newName, newPrice, 1)
    .subscribe((data)=>{
      this.showCart();
      console.log(data);
    });
  }
  };
  
  updatePrice(thePrice, val){
    this.cartService.putCartsPrice(this.itemIdArray[val], thePrice)
    .subscribe((data)=>{
      console.log(data);
      this.showCart();
    })
  }
  
  decrease(index){
    let myQuantity = 0;
    let newPrice = 0;
    let actPrice = 0;
    myQuantity = this.cartItems[index].quantity - 1;
    
      for(var i =0; i<this.products.length;i++){
      if(this.cartItems[index].name == this.products[i].name){
        actPrice = this.products[i].price;
      }
    }
    
    newPrice = ((myQuantity)*(actPrice));
    this.updatePrice(newPrice, index);
    
    this.cartService.putCartsQuantity(this.itemIdArray[index],  myQuantity)
    .subscribe((data)=>{
      this.showCart();
      console.log(data);
    })
  }
  
  increase(index){
    for(var i =0; i<this.products.length;i++){
      if(this.cartItems[index].name == this.products[i].name && this.cartItems[index].quantity == this.products[i].quantity){
        alert("Cannot inscrease item quantity because there is not enough stock");
        return;
      }
    }
    
    let myQuantity = 0;
    let newPrice = 0;
    let actPrice = 0;
    myQuantity = this.cartItems[index].quantity + 1;
    
    for(var i =0; i<this.products.length;i++){
      if(this.cartItems[index].name == this.products[i].name){
        actPrice = this.products[i].price;
      }
    }
    
    newPrice = ((myQuantity)*(actPrice));
    this.updatePrice(newPrice, index);
    this.cartService.putCartsQuantity(this.itemIdArray[index],  myQuantity)
    .subscribe((data)=>{
      this.showCart();
      console.log(data);
    })
  }
  
buyAll(){
  var isConfirmed = confirm("Are you sure you want to make this purchase?");//asks if user wants to make purchase
  if(isConfirmed){
    if(this.itemIdArray.length == 0){
      alert("Cart is empty. Add items to cart to make a purchase");//if cart is empty they cant purchase
    }
    else{
      //doing the receipt
      let theText = "";
      for(var j=0;j<this.cartItems.length;j++){
        theText = theText + " Product " + this.cartItems[j].name + " Price: $" + this.cartItems[j].price + " Quantity: " + this.cartItems[j].quantity;
      }
      alert(theText + "     " + this.totalPrice);
        
      //updates product quantities
      for(var i=0;i<this.itemIdArray.length;i++){
          for(var j=0;j<this.products.length;j++){
            if(this.products[j].name == this.cartItems[i].name){
              this.products[j].quantity = this.products[j].quantity - this.cartItems[i].quantity;
              this.callPut(j, this.products[j].quantity);//updates the quantity in the database
            }
          }
        //deletes products from the cart
        this.cartService.deleteCartProduct(this.itemIdArray[i])
        .subscribe((data)=>{
        console.log(data);
        })
      }
      //regathers the cart to display it
      this.showCart();
    }
  }
   
  else{//returns if the user hits cancel
    return;
  }
}
  
public deleteAll(){
  var isConfirmed = confirm("Are you sure you want to clear your cart?");
  if(isConfirmed){
    if(this.itemIdArray.length == 0){
      alert("Cart is already empty");
    }
    else{
      for(var i=0;i<this.itemIdArray.length;i++){
        this.cartService.deleteCartProduct(this.itemIdArray[i])
        .subscribe((data)=>{
        console.log(data);
        })
      }
    this.showCart();
    }
  }
  else{
    return;
  }
}
  
  public getTotal(){
    this.totalPrice = 0;
    for(var i = 0; i<this.cartItems.length; i++){
      this.totalPrice = this.totalPrice + ((this.cartItems[i].price));
    }
  }
  
deleteTheItem(deleteItemId){
    this.cartService.deleteCartProduct(this.itemIdArray[deleteItemId])
      .subscribe((data)=>{
        console.log(data);
        this.showCart();
    })
};
  
makeTextNode(theItem){
    var a = document.createElement("div");
    a.appendChild(theItem);
    return a.innerHTML;
}

makeButton(theId){
  alert(theId);
  var btn = document.createElement("BUTTON");
  var t = document.createTextNode("Delete Item");
  btn.appendChild(t);
  btn.setAttribute("onclick", "this.deleteJew()");
  return btn;
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
