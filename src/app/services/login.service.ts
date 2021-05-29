import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import baserUrl from './helper';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  public loginStatusSubject = new Subject<boolean>();

  constructor(private http:HttpClient) { }

  //get current logged in user

  // generate token
  public getCurrentLoggedIn(){
    return this.http.get(`${baserUrl}/current-user`);

  }

  // generate token
  public generateToken(loginData:any){
    return this.http.post(`${baserUrl}/generate-token`,loginData);

  }

  public loginUser(token:any){
    localStorage.setItem("token",token);
    return true;

  }

  //is logged in
  public isLoggedIn(){
    let token = localStorage.getItem("token");
    if(token == undefined || token == '' || token == null){
      return false
    }else{
      return true;
    }
    return false;
  }

  //logout
  public logout(){
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    return true;
  }

  //get token
  public getToken(){
    return localStorage.getItem("token");
  }

  public setUser(user:any){
    localStorage.setItem('user',JSON.stringify(user));
  }

  //get user
  public getUser(){
    let userDetails = localStorage.getItem("user");
    if(userDetails != null){
      return JSON.parse(userDetails);;
    }else{
      this.logout();
      return null;
    }
  }

  //get user role
  public getUserRole(){
    let user = this.getUser();
    return user.authorities[0].authority;
  }
}
