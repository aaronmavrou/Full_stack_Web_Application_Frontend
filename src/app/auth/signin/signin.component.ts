import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { AuthService } from '../auth.service';
import { CommentService } from '../../comment.service';
import { AppComponent } from '../../app.component';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.css'],
  providers: [CommentService]
})
export class SigninComponent implements OnInit {

  constructor(private authService: AuthService,
              private commentService: CommentService,
              private appComponent: AppComponent,
              private router: Router) { }

  ngOnInit() {
    this.authService.miniLogout()
  }
  
  goBack(){
    this.router.navigate(['unauth']);
  }
  
  comments: string[];
  
  onSignin(form: NgForm){
    const email = form.value.email;
    const password = form.value.password;
    this.authService.signinUser(email, password);
  }
  
  getDetails(theid){
    var a= document.getElementById(theid);
    if(a.style.display =="none"){
      a.style.display ="block";
    }else{
      a.style.display = "none";
    }
  }

  showComments(){
    this.commentService.getComments()
    .subscribe((data)=>{
      console.log(data);
      
      this.comments = [];
      
      for(var key in data){
        let str = JSON.stringify(data[key].name);
        this.comments.push(str);
      }
    });
  };
  
  // addProducts(newName, newPrice, newQuantity){
  //   this.productService.postFruits(newName, newPrice, newQuantity)
  //   .subscribe(data => console.log(data));
  // };

}
