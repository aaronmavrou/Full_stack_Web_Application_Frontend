import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth/auth.service';

@Component({
    selector: 'app-header',
    templateUrl: './header.component.html'
})

export class HeaderComponent implements OnInit{
    constructor(private authService: AuthService){}
    
    ngOnInit(){
       // this.authService MAKE your admins boy
    }
    
    onLogout(){
        this.authService.logout();
    }
    
}