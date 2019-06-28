import { Injectable } from '@angular/core';
import { HttpClient,HttpHeaders } from '@angular/common/http';
import { Cookie } from 'ng2-cookies/ng2-cookies';

@Injectable({
  providedIn: 'root'
})
export class HttpService {

  isLoggedIn: boolean = false;
  baseUrl = 'https://api.github.com';
  

  constructor(private http: HttpClient) { }

  authenticatingUser(httpOptions:any){
    this.http.get(this.baseUrl+'/user',httpOptions).subscribe(
      data => {
        console.log(data);
        //Cookie.set('')
        this.isLoggedIn = true;
      },
      error =>{
        console.log(error);
      }
      
    )   
  }
  getUserInfo(userId){
    return this.http.get(this.baseUrl+'/users/'+userId);
  }
  getAllUserRepos(userId){
    return this.http.get(this.baseUrl+'/users/'+userId+'/repos');
  }
  getAllUserStarRepos(userId){
    return this.http.get(this.baseUrl+'/users/'+userId+'/starred');
  }
  getAllUserGists(userId){
    return this.http.get(this.baseUrl+'/users/'+userId+'/gists');
  }
  getAllUserFollowers(userId){
    return this.http.get(this.baseUrl+'/users/'+userId+'/followers');
  }

  getSearchResult(search){
    return this.http.get(this.baseUrl+'/search/users?q='+search);
  }
  getGithubLogin(){
    let httpOptions = {
      headers: new HttpHeaders({
        'client_id': '2937e4fd792ffd739dbc',
        'client_secret': '640794b49ea025c0dd8e7edfea3dcb5586b6347f',
      })
    }
    return this.http.get('https://cors.io/?https://github.com/login/oauth/authorize',httpOptions);
  }
  
}

