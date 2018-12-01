import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth/auth.service';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-privacy',
  templateUrl: './privacy.component.html',
  styleUrls: ['./privacy.component.css']
})
export class PrivacyComponent implements OnInit {

  constructor(private authService: AuthService,
                private router: Router,) { }

  ngOnInit() {
  }
  
  goBack(){
    this.router.navigate(['unauth']);
  }

}
