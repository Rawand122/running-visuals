import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {HttpClient} from "@angular/common/http";
import {Activity} from "../models/activity.model";
import {LocalStorageService} from "../services/local-storage-service.service";
import {DetailedActivity} from "../models/detailed-activity.model";
import {GoogleMapsService} from "../services/google-maps.service";
import {MatDialog, MatDialogConfig} from '@angular/material/dialog';
import {MapPopupComponent} from "../map-popup/map-popup.component";
import {environment} from "../../environments/environment";


@Component({
  selector: 'app-strava-response',
  templateUrl: './strava-response.component.html'

})
export class StravaResponseComponent implements OnInit {
  responseCode!: string;
  errorMessage!: string;
  private accessToken: any;
  activities!: Activity[];
  zoom!: number;
  width!: number;
  center!: google.maps.LatLng;
  options!: google.maps.MapOptions;
  polylineOptions!: google.maps.PolylineOptions;
  path!: google.maps.LatLng[];
  bounds: google.maps.LatLngBounds = new google.maps.LatLngBounds

  showAthleteStats = false;


  constructor(private route: ActivatedRoute, private http: HttpClient, private localStorageService: LocalStorageService,
              private googleMapsService: GoogleMapsService, public dialog: MatDialog) {
  }

  ngOnInit() {
    const activitiesExist = this.localStorageService.getActivities();
    const accessTokenExists = this.localStorageService.getAccessToken();


    if (activitiesExist && activitiesExist.length > 0) {
      this.activities = activitiesExist;
      this.accessToken = accessTokenExists

    } else {
      this.route.queryParams.subscribe((params) => {
        this.responseCode = params['code'];
        this.errorMessage = params['error_description'];
        this.getAccessToken();
      });
    }
  }

  getAccessToken() {


    const clientId = environment.stravaClientID;
    const clientSecret = environment.stravaClientSecret;
    const authorizationCode = this.responseCode;

    const apiUrl = `https://www.strava.com/oauth/token?client_id=${clientId}&client_secret=${clientSecret}&code=${authorizationCode}&grant_type=authorization_code`;

    this.http.post(apiUrl, {}).subscribe(
      (response: any) => {
        // Handle the response from the server (access token, etc.)
        //console.log('Server Response:', response);
        this.localStorageService.saveAccessToken(response.access_token);
        this.accessToken = response.access_token;
        //console.log('Access Token:', this.accessToken);
        this.getActivities();
      },
      (error) => {
        // Handle any errors that occurred during the POST request
        console.error('Error posting data:', error);
      }
    );
  }

  getActivities() {
    // Check if activities were updated in the last 1 hour
    const apiUrl = environment.activitiesURL;
    const httpOptions = {
      headers: {
        Authorization: `Bearer ${this.accessToken}`,
      },
      params: {
        per_page: 100
      }
    };

    this.http.get<Activity[]>(apiUrl, httpOptions).subscribe(
      (response) => {
        // Handle the response from the server (activities array)
        this.activities = response;
        // console.log(JSON.stringify(this.activities) + 'activities');
        //console.log(JSON.stringify(response) + 'activities');

        // Save activities and timestamp to localStorage
        localStorage.setItem('activities', JSON.stringify(response));
        localStorage.setItem('activitiesTimestamp', new Date().getTime().toString());
      },
      (error) => {
        // Handle any errors that occurred during the GET request
        console.error('Error fetching activities:', error);
      }
    );

  }


  getDetailedActivity(id: number) {

    const apiUrl = `https://www.strava.com/api/v3/activities/${id.valueOf()}include_all_efforts`;
    const httpOptions = {
      headers: {
        Authorization: `Bearer ${this.accessToken}`,
      },
    };

    this.http.get<DetailedActivity>(apiUrl, httpOptions).subscribe(
      (response) => {
        // Handle the response from the server (activities array)
        // Save activities and timestamp to localStorage
        localStorage.setItem('DetailedActivity', JSON.stringify(response));
        localStorage.setItem('DetailedActivityTimestamp', new Date().getTime().toString());

        ///add values for map
        this.zoom = 13;
        this.path = this.googleMapsService.decodePolyline(response.map.polyline.toString());
        this.options = {
          mapTypeId: 'roadmap',
          zoomControl: false,
          mapTypeControl: false,
          streetViewControl: false
        }
        this.path.map((x) => {
          this.bounds.extend(x)

        })
        this.center = this.bounds.getCenter()


        //going to get segement info


        const data = {
          width: this.width, center: this.center, zoom: this.zoom, options:
          this.options, path: this.path, detailedActivity: response
        }

        const dialogConfig = new MatDialogConfig();
        dialogConfig.disableClose = false; // Prevent the user from closing the dialog by clicking outside
        dialogConfig.autoFocus = true; // Set the focus to the first focusable element in the dialog;
        dialogConfig.data = data;


        this.dialog.open(MapPopupComponent, dialogConfig);
        // console.log("decoded polyline: " + this.path);
      },
      (error) => {
        // Handle any errors that occurred during the GET request
        console.error('Error fetching athlete stats:', error);
      }
    );

  }


  protected readonly Math = Math;
}

