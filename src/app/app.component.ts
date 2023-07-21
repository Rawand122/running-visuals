import { Component,OnInit } from '@angular/core';
import {AuthService} from "./auth.service";
import {Observable} from "rxjs";
import {OAuthService} from "angular-oauth2-oidc";
import {HttpClient, HttpClientModule} from "@angular/common/http";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  activities: any;
constructor(private http:HttpClientModule) {

}
  ngOnInit() {

  }

}
