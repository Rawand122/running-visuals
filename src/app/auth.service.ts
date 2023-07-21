import { Injectable } from '@angular/core';
import {BehaviorSubject, Observable} from 'rxjs';
import {AuthConfig, OAuthService} from "angular-oauth2-oidc";
import {HttpClient} from "@angular/common/http";



@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private  oAuthService: OAuthService, private http: HttpClient) {}


  getActivities(): Observable<any> {
      const apiUrl = 'https://www.strava.com/api/v3/athlete/activities';
      console.log(this.oAuthService.getAccessToken());
      const headers = {
        Authorization: `Bearer ${this.oAuthService.getAccessToken()}`,
      };
      return this.http.get(apiUrl, { headers });
    }


}
