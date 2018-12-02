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
  
  // callPut(){
  //   this.productService.putProducts(this.idArray[1], 'joe', 4, 3, 'hillbilly', 4)
  //   .subscribe((data)=>{
  //     console.log(data);
  //     this.showProducts();
  //   })
  // }
  
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
  
  makeReview(productName: string){
    this.router.navigate(['review']);
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
  
  addTheItem(newName, newPrice){
    alert("we adding the item");
    this.cartService.postCart(newName, newPrice, 1)
    .subscribe((data)=>{
      this.showCart();
      console.log(data);
    });
  };
  
  updatePrice(thePrice, val){
    this.cartService.putCartsPrice(this.itemIdArray[val], thePrice)
    .subscribe((data)=>{
      console.log(data);
      this.showCart();
    })
  }
  
  increase(index){
    let myQuantity = 0;
    let newPrice = 0;
    let actPrice = 0;
    myQuantity = this.cartItems[index].quantity + 1;
    for(var i =0; i<this.products.length;i++){
      alert(this.cartItems[index].name + "    " + this.products[i].name);
      if(this.cartItems[index].name == this.products[i].name){
        alert("inside the if");
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
  
// BuyAll(){
//   var isConfirmed = confirm("Are you sure you want to make this purchase?");
//   if(isConfirmed){
//     if(this.itemArray.length == 0){
//       alert("Cart is empty. Add items to cart to make a purchase");
//     }
     
//     else{
//         for(var i=0;i<this.itemIdArray.length;i++){
//           for(var j=0;j<this.products.length;i++){
//             if(this.products[i].name == this.cartItems[i].name){
              
//             }
//           }
//         this.cartService.deleteCartProduct(this.itemIdArray[i])
//         .subscribe((data)=>{
//         console.log(data);
//         })
//       }
//       this.showCart();
//     }
     
//   }
   
//   else{
//     return;
//   }
// }
  
deleteAll(){
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
  
  decrease(index){
    let myQuantity = this.cartItems[index].quantity - 1;
    this.cartService.putCartsQuantity(this.itemIdArray[index],  myQuantity)
    .subscribe((data)=>{
      this.showCart();
      console.log(data);
    })
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
