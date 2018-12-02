import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-deactivate',
  templateUrl: './deactivate.component.html',
  styleUrls: ['./deactivate.component.css']
})
export class DeactivateComponent implements OnInit {

  constructor(private router: Router) { }
  
  goBack(){
    this.router.navigate(['admin']);
  }
  
  ngOnInit() {
  }

}
