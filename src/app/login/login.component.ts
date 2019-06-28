import { Component, OnInit } from '@angular/core';
import { HttpService } from '../http.service';
import{ HttpHeaders } from '@angular/common/http';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  username: string;
  password: string;
  

  constructor(private http: HttpService) { }

  ngOnInit() {
  }
 
  onSubmit(){
    let httpOptions = {
      headers: new HttpHeaders({
        'Content-Type':  'application/json',
        'Authorization': 'Basic '+ btoa(this.username+':'+this.password) 
      })
    };
    this.http.authenticatingUser(httpOptions);
  }
  onGitAuth(){
    this.http.getGithubLogin().subscribe(
      data =>{
        console.log(data);
      },
      error =>{
        console.log(error);
      }
    );
  }
}
