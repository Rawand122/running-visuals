import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {HttpClient} from "@angular/common/http";
import {Activity} from "../models/activity.model";

@Component({
  selector: 'app-strava-response',
  templateUrl:'./strava-response.component.html'

})
export class StravaResponseComponent implements OnInit {
  // @ts-ignore
  responseCode: string;
  // @ts-ignore
  errorMessage: string;
  private accessToken: any;
  // @ts-ignore
 activities: Activity[];

  constructor(private route: ActivatedRoute, private http:HttpClient) {}

  ngOnInit() {
    this.route.queryParams.subscribe((params) => {
      this.responseCode = params['code'];
      this.errorMessage = params['error_description'];
      this.getAccessToken();
    });
  }

  getAccessToken() {


    const clientId = '110328';
    const clientSecret = 'd8482201d327ceb57a285b568b22c62c2eabf6dd';
    const authorizationCode = this.responseCode;

    const apiUrl = `https://www.strava.com/oauth/token?client_id=${clientId}&client_secret=${clientSecret}&code=${authorizationCode}&grant_type=authorization_code`;

    this.http.post(apiUrl, {}).subscribe(
      (response: any) => {
        // Handle the response from the server (access token, etc.)
        console.log('Server Response:', response);
        this.accessToken = response.access_token;
        console.log('Access Token:', this.accessToken);
        this.getActivities();
      },
      (error) => {
        // Handle any errors that occurred during the POST request
        console.error('Error posting data:', error);
      }
    );
  }

  getActivities() {
    const apiUrl = 'https://www.strava.com/api/v3/athlete/activities';
    const httpOptions = {
      headers: {
        Authorization: `Bearer ${this.accessToken}`,
      },
    };

    this.http.get<any[]>(apiUrl, httpOptions).subscribe(
      (response) => {
        // Handle the response from the server (activities array)
        this.activities = response;
        console.log(JSON.stringify(this.activities) + "activities")
        console.log(JSON.stringify(response) + "activities")
      },
      (error) => {
        // Handle any errors that occurred during the GET request
        console.error('Error fetching activities:', error);
      }
    );
  }

  isActivitiesUpdatedWithinOneHour(): boolean {
    const activitiesTimestamp = localStorage.getItem('activitiesTimestamp');
    if (activitiesTimestamp) {
      const oneHourInMillis = 60 * 60 * 1000;
      const currentTimeInMillis = new Date().getTime();
      return currentTimeInMillis - Number(activitiesTimestamp) <= oneHourInMillis;
    }
    return false;
  }

}

