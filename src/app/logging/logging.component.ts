import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth/auth.service';
import { Router, ActivatedRoute } from '@angular/router';
import { DmcaService } from '../dmca.service';

@Component({
  selector: 'app-logging',
  templateUrl: './logging.component.html',
  styleUrls: ['./logging.component.css']
})
export class LoggingComponent implements OnInit {
  
  dmcas: any;

  constructor(private authService: AuthService,
              private router: Router,
              private dmcaService: DmcaService) { }

  ngOnInit() {
    this.showDmcas();
  }
  
  //reroute to homepage
  goBack(){
    this.router.navigate(['admin']);
  }
  
  //show the dmca reports
  showDmcas(){
    this.dmcaService.getDmcas()
    .subscribe((data)=>{
      console.log(data);
      this.dmcas = [];
      this.dmcas = data;
    });
  };
  
  //allows the manager to save the dmca policy
  savePolicy(theInfo){
    theInfo = this.authService.encodeHTML(theInfo);
    this.dmcaService.postDmcas('dmca', theInfo)
      .subscribe((data)=>{
      this.showDmcas();
    });
  }

}
