import { Component, OnInit } from '@angular/core';
import { CommentService } from '../comment.service';
import { Router, ActivatedRoute } from '@angular/router';
import { AuthService } from '../auth/auth.service';

@Component({
  selector: 'app-addcomment',
  templateUrl: './addcomment.component.html',
  styleUrls: ['./addcomment.component.css']
})
export class AddcommentComponent implements OnInit {

  constructor(private router: Router,
              private commentService: CommentService,
              private authService: AuthService) { }

  ngOnInit() {
  }
  
  //reroutes to homepage
leaveHere(){
  this.router.navigate(['afterlogin']);
}

//adds the comment to the comment database with encoding
addComment(prod, rate, comment){
  prod = this.authService.encodeHTML(prod);
  rate = this.authService.encodeHTML(rate);
  comment = this.authService.encodeHTML(comment);
  //check to see if rate field is empty
  if(rate == ''){
    alert("Cannot save comment. Please enter a rating between 1 and 5");
  }
  //adds the comment to the databse
  else{
  let owner = this.authService.theEmail;
  this.commentService.postComments(owner, prod, rate, comment, true)
    .subscribe((data)=>{
      console.log(data);
  });
  this.router.navigate(['afterlogin']);//reroutes to main page
}
};

}
