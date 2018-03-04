import { Injectable } from '@angular/core';
import { Http, Headers } from '@angular/http';
import { User } from '../models/user';
import { HttpClient } from '@angular/common/http';

@Injectable()
export class LoginService {
  private serverPath: string = "localhost:8080/demo/add";

  constructor(private http: Http) { }

  sendCredential(username: string, password: string) {
    const url = this.serverPath;
    const encodedCredentials = btoa(username + ":" + password);
    const basicHeader = "Basic " + encodedCredentials;
    const headers = new Headers({
      'Content-Type': 'application/x-www-form-urlencoded',
      'Authorization': basicHeader
    });
    console.log("Login GET Request supposedly completed (Might not be working)!");

    return this.http.get(url, { headers: headers });
  }
}
