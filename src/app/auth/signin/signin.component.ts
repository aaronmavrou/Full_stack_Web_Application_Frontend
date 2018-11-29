import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { AuthService } from '../auth.service';
import { ProductService } from '../../product.service';
import { AppComponent } from '../../app.component';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.css'],
  providers: [ProductService]
})
export class SigninComponent implements OnInit {

  constructor(private authService: AuthService,
              private productService: ProductService,
              private appComponent: AppComponent,
              private router: Router) { }

  ngOnInit() {
    this.authService.miniLogout();
  }
  
  fruits: string[];
  
  goBack(){
    this.router.navigate(['unauth']);
  }
  
  onSignin(form: NgForm){
    const email = form.value.email;
    const password = form.value.password;
    this.authService.signinUser(email, password);
  }

  showFruits1(){
    this.productService.getFruits()
    .subscribe((data)=>{
      console.log(data);
      
      this.fruits = [];
      
      for(var key in data){
        let str = JSON.stringify(data[key].name);
        this.fruits.push(str);
      }
    });
  };
  
  addFruits1(newName){
    this.productService.postFruits(newName)
    .subscribe(data => console.log(data));
  };

}
