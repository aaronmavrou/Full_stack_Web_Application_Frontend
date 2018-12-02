import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth/auth.service';
import { Router, ActivatedRoute } from '@angular/router';
import { DmcaService } from '../dmca.service';

@Component({
  selector: 'app-privacy',
  templateUrl: './privacy.component.html',
  styleUrls: ['./privacy.component.css']
})
export class PrivacyComponent implements OnInit {

dmcas: any;
myIds: any;
  constructor(private authService: AuthService,
                private router: Router,
                private dmcaService: DmcaService) { }

  ngOnInit() {
    this.showDmcas();
  }
  
  goBack(){
    if(this.authService.isManager()){
      this.router.navigate(['admin']);
    }
    else if(this.authService.isAuthenticated()){
      this.router.navigate(['afterlogin']);
    }
    else{
      this.router.navigate(['unauth']);
    }
  }

  showDmcas(){
    this.dmcaService.getDmcas()
    .subscribe((data)=>{
      console.log(data);
      
      this.dmcas = [];
      this.dmcas = data;
      this.myIds = [];
      
      for(var key in data){
        let prp = data[key]._id;
        this.myIds.push(prp);
      }
    });
  };
  
  savePolicy(val, theInfo){
    this.dmcaService.putDmcas(this.myIds[val], theInfo)
      .subscribe((data)=>{
      this.showDmcas();
    });
  }

}
