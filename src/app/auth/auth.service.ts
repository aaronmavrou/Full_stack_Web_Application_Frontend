import { Router } from '@angular/router';

import { Injectable } from '@angular/core';
import { AngularFireAuth } from 'angularfire2/auth';
import * as firebase from 'firebase';
import 'firebase/auth';


@Injectable()
export class AuthService {

    token: string;
    emailConfirmed: boolean = false;
    
    constructor(private router: Router){}
    
    signupUser(email: string, password: string){
        firebase.auth().createUserWithEmailAndPassword(email, password)
            .then(
                response=>{
                    this.sendVerification();
                }
            )
            .catch(
                error=> console.log(error)
            );
    }
    
    sendVerification(){
        var user = firebase.auth().currentUser;
        alert("Sending Verification");
        user.sendEmailVerification().then(function(){
            
        }).catch(function(error){
            
        });
        
    }
    
    signinUser(email: string, password: string){
        firebase.auth().signInWithEmailAndPassword(email, password)
            .then(
                response => {
                    if(this.hasVerified()){
                        this.router.navigate(['/']);
                        }
                    else{
                        this.signinLogout();
                    }
                    
                    
                    firebase.auth().currentUser.getIdToken()
                    .then(
                        (token: string) => this.token = token
                    )
                }
            )
            .catch(
                    error => console.log(error)
                );
    }
    
    signinLogout(){
        alert("user has not been verified by email");
        firebase.auth().signOut();
        this.token = null;
    }
    
    miniLogout(){
        firebase.auth().signOut();
        this.token = null;
    }
    
    getIdToken(){
        firebase.auth().currentUser.getIdToken()
        .then(
            (token: string) => this.token = token
        );
        return this.token;
    }
    
    isAuthenticated(){
        if (!this.hasVerified()){
            return false;
        } else{
            return this.token != null;
        }
    
    }
    
    logout(){
        firebase.auth().signOut();
        this.token = null;
        this.router.navigate(['/']);
    }
    
    hasVerified(){
        var user = firebase.auth().currentUser;
        
        if(!user){
            return this.emailConfirmed;
            alert("no user has logged in");
        } else {
            if (user.emailVerified == false) {
                this.emailConfirmed = false;
            }
            else {
                this.emailConfirmed = user.emailVerified;
            }
            
            return this.emailConfirmed;
        }
    }
    
}