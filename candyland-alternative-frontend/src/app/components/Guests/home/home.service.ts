import { Injectable } from "@angular/core";

@Injectable()
export class HomeService {
  username: string = 'James';

  getUsername() {
    return this.username;
  }
 }