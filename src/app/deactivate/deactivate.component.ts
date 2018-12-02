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
  
  goBack(){
    this.router.navigate(['admin']);
  }
  
  ngOnInit() {
    this.showUsers();
  }
  
  
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
  
  updateUserFalse(val){
    this.authService.putUser(this.myIds[val], false)
      .subscribe((data)=>{
      this.showUsers();
      this.authService.getAllUsers();
    });
  }
  
  updateUserTrue(val){
    this.authService.putUser(this.myIds[val], true)
      .subscribe((data)=>{
      this.showUsers();
      this.authService.getAllUsers();
    });
  }
  
  

}
