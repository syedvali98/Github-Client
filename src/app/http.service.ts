import { Injectable } from '@angular/core';
import { HttpClient,HttpHeaders } from '@angular/common/http';
import { Cookie } from 'ng2-cookies/ng2-cookies';
import { Router } from '@angular/router';
import { BehaviorSubject } from 'rxjs'

@Injectable({
  providedIn: 'root'
})
export class HttpService {

  isLoggedIn: BehaviorSubject<Boolean>;
  baseUrl = 'https://api.github.com';
  authHash = Cookie.get('authHash');

  constructor(private http: HttpClient, private router:Router) {
    this.CheckingUserStatus();
   }

   CheckingUserStatus(){
    if(Cookie.get('authHash') === undefined || Cookie.get('authHash') === '' || Cookie.get('authHash') === null){
      this.isLoggedIn = new BehaviorSubject<Boolean>(false);
    }
    else{
      this.isLoggedIn = new BehaviorSubject<Boolean>(true);
    }
  }
  authenticatingUser(httpOptions:any){
    return this.http.get(this.baseUrl+'/user',httpOptions);
  }
  getLoggedInStatus(){
    return this.isLoggedIn.asObservable();
  }
  getUserInfo(userId){
    let httpOptions = {
      headers: new HttpHeaders({
        'Content-Type':  'application/json',
        'Authorization': 'Basic '+ this.authHash
      })
    };
    return this.http.get(this.baseUrl+'/users/'+userId,httpOptions);
  }
  getAllUserRepos(userId){
    let httpOptions = {
      headers: new HttpHeaders({
        'Content-Type':  'application/json',
        'Authorization': 'Basic '+ this.authHash
      })
    };
    return this.http.get(this.baseUrl+'/users/'+userId+'/repos',httpOptions);
  }
  getAllUserStarRepos(userId){
    let httpOptions = {
      headers: new HttpHeaders({
        'Content-Type':  'application/json',
        'Authorization': 'Basic '+ this.authHash
      })
    };
    return this.http.get(this.baseUrl+'/users/'+userId+'/starred',httpOptions);
  }
  getAllUserGists(userId){
    let httpOptions = {
      headers: new HttpHeaders({
        'Content-Type':  'application/json',
        'Authorization': 'Basic '+ this.authHash
      })
    };
    return this.http.get(this.baseUrl+'/users/'+userId+'/gists',httpOptions);
  }
  getAllUserFollowers(userId){
    let httpOptions = {
      headers: new HttpHeaders({
        'Content-Type':  'application/json',
        'Authorization': 'Basic '+ this.authHash
      })
    };
    return this.http.get(this.baseUrl+'/users/'+userId+'/followers',httpOptions);
  }

  getSearchResult(search){
    let httpOptions = {
      headers: new HttpHeaders({
        'Content-Type':  'application/json',
        'Authorization': 'Basic '+ this.authHash
      })
    };
    return this.http.get(this.baseUrl+'/search/users?q='+search,httpOptions);
  }
    
}

