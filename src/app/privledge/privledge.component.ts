import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-privledge',
  templateUrl: './privledge.component.html',
  styleUrls: ['./privledge.component.css']
})
export class PrivledgeComponent implements OnInit {

  constructor(private router: Router) { }
  
  goBack(){
    this.router.navigate(['admin']);
  }

  ngOnInit() {
  }

}
