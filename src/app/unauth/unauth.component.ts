import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth/auth.service';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-unauth',
  templateUrl: './unauth.component.html',
  styleUrls: ['./unauth.component.css']
})
export class UnauthComponent implements OnInit {

  constructor(private authService: AuthService,
              private router: Router) { }

goBrowse(){
    this.router.navigate(['product-list']);
  }

  ngOnInit() {
  }

}
