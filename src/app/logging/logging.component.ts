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
  
  goBack(){
    this.router.navigate(['admin']);
  }
  
  showDmcas(){
    this.dmcaService.getDmcas()
    .subscribe((data)=>{
      console.log(data);
      this.dmcas = [];
      this.dmcas = data;
    });
  };
  
  savePolicy(theInfo){
    this.dmcaService.postDmcas('dmca', theInfo)
      .subscribe((data)=>{
      this.showDmcas();
    });
  }

}
