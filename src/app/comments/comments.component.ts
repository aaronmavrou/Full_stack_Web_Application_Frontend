import { Component, OnInit } from '@angular/core';
import { CommentService } from '../comment.service';
import { Router, ActivatedRoute } from '@angular/router';
import { AuthService } from '../auth/auth.service';

@Component({
  selector: 'app-comments',
  templateUrl: './comments.component.html',
  styleUrls: ['./comments.component.css']
})
export class CommentsComponent implements OnInit {

comments: any;
myIds: any;

  constructor(private authService: AuthService,
              private commentService: CommentService,
              private router: Router) { }

  ngOnInit() {
    this.showComments();
  }
  
  //reroutes to the homepage
  goBack(){
      this.router.navigate(['admin']);
  }
  
  //displays the comments on the screen
  showComments(){
    this.commentService.getComments()
    .subscribe((data)=>{
      console.log(data);
      this.comments = [];
      this.comments = data;
      this.myIds = [];
      for(var key in data){
        let str = data[key]._id;
        this.myIds.push(str);
      }
    });
  };
  
  //change the comment boolean to false
  updateCommentFalse(val){
    this.commentService.putComments(this.myIds[val], false)
      .subscribe((data)=>{
      this.showComments();
    });
  }
  
  //change the comment boolean back to true
  updateCommentTrue(val){
    this.commentService.putComments(this.myIds[val], true)
      .subscribe((data)=>{
      this.showComments();
    });
  }
  

}
