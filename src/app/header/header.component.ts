import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth/auth.service';
import { Router, ActivatedRoute } from '@angular/router';
import { CartService } from '../cart.service';

@Component({
    selector: 'app-header',
    templateUrl: './header.component.html'
})

export class HeaderComponent implements OnInit{
    
    itemIdArray: any;
    
    constructor(private authService: AuthService,
                private router: Router,
                private cartService: CartService){}
    
    ngOnInit(){
       this.authService.createManager();
       this.authService.getAllUsers();
    }
    
refreshCart(){
    this.fetchCart();
}
    
fetchCart(){
    this.cartService.getCart()
    .subscribe((data)=>{
      console.log(data);
      this.itemIdArray = [];
       for(var key in data){
        let str = (data[key]._id);
        this.itemIdArray.push(str);
      }
      this.deleteAllAtStart();
  });
 }
    
public deleteAllAtStart(){
    if(this.itemIdArray.length == 0){
      return;
    }
    else{
      for(var i=0;i<this.itemIdArray.length;i++){
        this.cartService.deleteCartProduct(this.itemIdArray[i])
        .subscribe((data)=>{
        console.log(data);
        })
      }
  }
}
    
    //reroutes to privacy
    viewPrivacy(){
        this.router.navigate(['privacy']);
    }
    //reroutes to takedown
    viewTakedown(){
        this.router.navigate(['takedown']);
    }
    //reroutes to logging
    logStuff(){
        this.router.navigate(['logging']);
    }
    //reroutes on logout
    onLogout(){
        this.authService.logout();
    }
    //reroutes to managing comments page
    manageComments(){
        this.router.navigate(['comments']);
    }
    //reroutes to deactivate accounts
    deactivateAccounts(){
        this.router.navigate(['deactivate']);
    }
    //reroutes to making manager page
    makeManager(){
        this.router.navigate(['privledge']);
    }
    
}