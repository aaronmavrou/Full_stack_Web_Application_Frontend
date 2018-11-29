import { Router } from '@angular/router';

import { Injectable } from '@angular/core';
import { AngularFireAuth } from 'angularfire2/auth';
import * as firebase from 'firebase';
import 'firebase/auth';


@Injectable()
export class AuthService {
    happy: string;
    token: string;
    resend: boolean = false;
    confirmation: boolean = false;
    
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
        alert(this.token);
    }
    
    signinUser(email: string, password: string){
        firebase.auth().signInWithEmailAndPassword(email, password)
            .then(
                response => {
                    if(this.verifiedEmail()){
                        this.router.navigate(['/']);
                    }
                    else{
                        this.notVerified();
                    }
                    firebase.auth().currentUser.getIdToken()
                    .then(
                        (token: string) => this.token = token
                    )})
            .catch(
                //error => console.log(error)
                error => alert(error)
            );
    }
    
    notVerified(){
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
    
    isKindaAuthenticated(){
        var user = firebase.auth().currentUser;
        if(!user){
            return this.resend;
        }
        else{
            this.resend = true;
        }
        return this.resend;
    }
    
    resendVerification(){
        alert("this is my alert");
        this.sendVerification();
    }
    
    isAuthenticated(){
        if (!this.verifiedEmail()){
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
    
    verifiedEmail(){
        var user = firebase.auth().currentUser;
        if(!user){
            return this.confirmation;
            alert("no user has logged in");
        } else {
            if (user.emailVerified == false) {
                this.confirmation = false;
            }
            else {
                this.confirmation = user.emailVerified;
            }
            return this.confirmation;
        }
    }
}