import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { AuthService } from '../auth/auth.service';

@Component({
  selector: 'app-deactivate',
  templateUrl: './deactivate.component.html',
  styleUrls: ['./deactivate.component.css']
})
export class DeactivateComponent implements OnInit {
  
  users: any;
  myIds: any;
  
  constructor(private router: Router,
              private authService: AuthService) { }
  
  //reroute to the homepage
  goBack(){
    this.router.navigate(['admin']);
  }
  
  ngOnInit() {
    this.showUsers();
  }
  
  //show all the users in the database
  showUsers(){
    this.authService.getUsers()
    .subscribe((data)=>{
      console.log(data);
      this.users = [];
      this.users = data;
      this.myIds = [];
      for(var key in data){
        let str = data[key]._id;
        this.myIds.push(str);
      }
    });
  };
  
  //change the activated boolean to false
  updateUserFalse(val){
    this.authService.putUser(this.myIds[val], false)
      .subscribe((data)=>{
      this.showUsers();
      this.authService.getAllUsers();
    });
  }
  
  //change the activated boolean back to true
  updateUserTrue(val){
    this.authService.putUser(this.myIds[val], true)
      .subscribe((data)=>{
      this.showUsers();
      this.authService.getAllUsers();
    });
  }
  
  

}
