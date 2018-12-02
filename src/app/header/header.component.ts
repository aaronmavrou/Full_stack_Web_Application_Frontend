import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth/auth.service';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
    selector: 'app-header',
    templateUrl: './header.component.html'
})

export class HeaderComponent implements OnInit{
    constructor(private authService: AuthService,
                private router: Router,){}
    
    ngOnInit(){
       this.authService.createManager();
       this.authService.getAllUsers();
    }
    viewPrivacy(){
        this.router.navigate(['privacy']);
    }
    
    viewTakedown(){
        this.router.navigate(['takedown']);
    }
    
    logStuff(){
        this.router.navigate(['logging']);
    }
    
    onLogout(){
        this.authService.logout();
    }
    
    manageComments(){
        this.router.navigate(['comments']);
    }
    
    deactivateAccounts(){
        this.router.navigate(['deactivate']);
    }
    
    makeManager(){
        this.router.navigate(['privledge']);
    }
    
}