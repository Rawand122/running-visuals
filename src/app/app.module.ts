import {importProvidersFrom, NgModule} from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { StravaComponent } from './strava.component';
import { RouterModule, Routes } from '@angular/router';
import { FormatValuesPipe } from './format-values.pipe';
import {HttpClientModule} from "@angular/common/http";
import { OAuthModule, AuthConfig, OAuthService } from 'angular-oauth2-oidc';
import { StravaResponseComponent } from './strava-response/strava-response.component';




const routes: Routes = [
  {
path:'strava',component:StravaComponent,pathMatch:'full'},
  {path:'strava_response',component:StravaResponseComponent, pathMatch:'full'}
]


export const authConfig: AuthConfig = {
  issuer: 'https://www.strava.com/oauth/token',
  clientId: '110328',
  redirectUri: window.location.origin + "/strava",
  scope: 'read,activity:read_all',
  responseType: 'code',
  oidc: false,
};

@NgModule({
  declarations: [
    AppComponent,
    StravaComponent,
    FormatValuesPipe,
    StravaResponseComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    RouterModule.forRoot(routes),
    OAuthModule.forRoot({
      resourceServer: {
        allowedUrls: ['https://www.strava.com/api/v3'],
        sendAccessToken: true,
      }})
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {

  constructor() {
  }
}
