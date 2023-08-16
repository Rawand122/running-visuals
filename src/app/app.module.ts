import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';

import {AppComponent} from './app.component';
import {StravaComponent} from './strava.component';
import {RouterModule, Routes} from '@angular/router';
import {HttpClientModule} from "@angular/common/http";
import {OAuthModule} from 'angular-oauth2-oidc';
import {StravaResponseComponent} from './strava-response/strava-response.component';
import {GoogleMapsModule} from "@angular/google-maps";
import {MapPopupComponent} from './map-popup/map-popup.component';
import {MatDialogModule} from '@angular/material/dialog';
import {MatButtonModule} from "@angular/material/button";
import {MatIconModule} from "@angular/material/icon";
import {DistancePipe} from './pipes/distance.pipe';
import {SpeedPipe} from './pipes/speed.pipe';
import {TimePipe} from './pipes/time.pipe';
import {MatTabsModule} from "@angular/material/tabs";
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";
import {environment} from "../environments/environment";


const routes: Routes = [
  {
    path: 'strava', component: StravaComponent, pathMatch: 'full'
  },
  {path: 'strava_response', component: StravaResponseComponent, pathMatch: 'full'},
  {path: '', component: AppComponent, pathMatch: 'full'}
]
@NgModule({
  declarations: [
    AppComponent,
    StravaComponent,
    StravaResponseComponent,
    MapPopupComponent,
    DistancePipe,
    SpeedPipe,
    TimePipe
  ],
  imports: [
    BrowserModule,

    HttpClientModule,
    RouterModule.forRoot(routes),
    OAuthModule.forRoot({
      resourceServer: {
        allowedUrls: ['https://www.strava.com/api/v3'],
        sendAccessToken: true,
      }
    }),
    GoogleMapsModule,
    MatDialogModule,
    MatButtonModule,
    MatIconModule,
    MatTabsModule,
    BrowserAnimationsModule

  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {

  constructor() {
  }
}
