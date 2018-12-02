import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { AuthService } from '../auth/auth.service';

@Component({
  selector: 'app-privledge',
  templateUrl: './privledge.component.html',
  styleUrls: ['./privledge.component.css']
})
export class PrivledgeComponent implements OnInit {

  users: any;
  myIds: any;
  managers: any;
  
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

  makeManager(i){
    this.authService.admins.push(this.users[i].email);
    this.authService.postManagers(this.users[i].email)
    .subscribe((data)=>{
      alert(this.users[i].email + " has now been granted Manager privileges!");
    });
  }
  
}
