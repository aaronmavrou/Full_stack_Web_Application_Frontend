import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth/auth.service';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-takedown',
  templateUrl: './takedown.component.html',
  styleUrls: ['./takedown.component.css']
})
export class TakedownComponent implements OnInit {

  constructor(private authService: AuthService,
                private router: Router,) { }

  ngOnInit() {
  }
  
  goBack(){
    this.router.navigate(['unauth']);
  }

}
