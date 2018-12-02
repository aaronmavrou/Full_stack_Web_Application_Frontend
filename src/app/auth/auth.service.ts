import { Router } from '@angular/router';
import { Injectable } from '@angular/core';
import { AngularFireAuth } from 'angularfire2/auth';
import * as firebase from 'firebase';
import 'firebase/auth';
import { HttpClient } from '@angular/common/http';
import { HttpHeaders } from '@angular/common/http';


@Injectable()
export class AuthService {
    httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json',
    'Authorization': 'my-auth-token'
  })
};

    public userEmails: any;
    public userBools: any;
    public theEmail: string;
    happy: string;
    token: string;
    admins: any;
    resend: boolean = false;
    confirmation: boolean = false;
    
    constructor(private router: Router,
                private http: HttpClient){}
    
    signupUser(email: string, password: string){
        firebase.auth().createUserWithEmailAndPassword(email, password)
            .then(
                response=>{
                    this.sendVerification();
                    this.postThisUser(email);
                }
            )
            .catch(
                error=> alert(error)
            );
    }
    
    postThisUser(theEmail){
        this.postUsers(theEmail, true)
        .subscribe((data)=>{
            console.log(data);
        });
    }
    
    sendVerification(){
        var user = firebase.auth().currentUser;
        alert("Sending Verification");
        user.sendEmailVerification().then(function(){
        }).catch(function(error){
        });
    }
    
    signinUser(email: string, password: string){
        for(var i = 0; i<this.userEmails.length; i++){
            alert(email + "     " + this.userEmails[i] + "       " + this.userBools[i]);
            if((email == this.userEmails[i]) && (this.userBools[i]==false)){
                alert("This account has been deactivated. Please contact the store manager for further inquiries.");
                return;
            }
        }
        firebase.auth().signInWithEmailAndPassword(email, password)
            .then(
                response => {
                    if(this.verifiedEmail() && this.isManager()){
                        this.theEmail = firebase.auth().currentUser.email;
                        this.router.navigate(['admin']);
                        
                    }
                    else if(this.verifiedEmail()){
                        this.theEmail = firebase.auth().currentUser.email;
                        this.router.navigate(['afterlogin']);
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
                error => alert(error + "    Please contact the store manager for any clarification")
            );
    }
    
//User for the login function to validate authentication
  public getAllUsers(){
    this.getUsers()
    .subscribe((data)=>{
      console.log(data);
      this.userEmails = [];
      this.userBools = [];
      for(var key in data){
        let str = data[key].email;
        this.userEmails.push(str);
        let prp = data[key].isActivated;
        this.userBools.push(prp);
      }
    });
  };
    
    createManager(){
        this.getManagers()
        .subscribe((data)=>{
            this.admins=[];
            for(var i in data){
                this.admins.push(data[i].email);
            }
        });
    }
    
    isManager(){
        if(firebase.auth().currentUser == null){
            return false;
        }
        let leEmail = firebase.auth().currentUser.email;
        for (var i= 0; i<this.admins.length;i++){
            if(leEmail == this.admins[i]){
                return true;
            }
        }
        return false; 
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
        this.router.navigate(['/unauth']);
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
    
  public managersUrl1 = 'managers/create';
  public managersUrl2 = 'managers/delete/';
  public managersUrl3 = 'managers/getall';
  
  public getManagers(){
    return this.http.get(this.managersUrl3);
  };
  
  public postManagers(email2: string){
    let managerObj = {
      "email": email2,
    }
    return this.http.post(this.managersUrl1, managerObj, this.httpOptions);
  }
  
  public deleteManager(loc: string){
    let jay= this.managersUrl2;
    jay = jay + loc;
    alert(jay);
    return this.http.delete(jay, this.httpOptions);
  }
  
    
  public usersUrl1 = 'users/getall';
  public usersUrl2 = 'users/create';
  public usersUrl3 = 'users/delete/';
  public usersUrl4 = 'users/updateUser/';
  
  public getUsers(){
    return this.http.get(this.usersUrl1);
  };
  
  public postUsers(email2: string, activate2: boolean){
    let fruitObj = {
      "email": email2,
      "isActivated": activate2,
    }
    return this.http.post(this.usersUrl2, fruitObj, this.httpOptions);
  }
  
  public putUser(loc: string, activate2: boolean){
    let userObj = {
      "isActivated": activate2
    }
    let jay = this.usersUrl4;
    jay = jay + loc;
    return this.http.put(jay, userObj, this.httpOptions);
  }
  
  public deleteUser(loc: string){
    let jay= this.usersUrl3;
    jay = jay + loc;
    return this.http.delete(jay, this.httpOptions);
  }
    
}