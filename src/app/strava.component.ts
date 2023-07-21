import { Component,OnInit } from '@angular/core';
import { parse} from 'papaparse';
import {OAuthService} from "angular-oauth2-oidc";
import {ActivatedRoute} from "@angular/router";
import {HttpClient, HttpClientModule} from "@angular/common/http";

@Component({
  selector: 'app-strava',
  templateUrl: './strava.component.html',
  styleUrls: ['./strava.component.css']
})

export class StravaComponent  implements OnInit
{



  pageTitle:string = "Strava page"

  parsedData!: any[];
  filteredData!:any[];

  constructor(private http:HttpClient, private route: ActivatedRoute) {

    const csvData = 'assets/csv/activities.csv';
    parse(csvData, {
      download: true,
      complete: (results) => {
        this.parsedData = results.data;
        this.filterIndexes([1,3,15,16,17,18,20,21,22,23,28,29,34]);
      }
    });


  }

  ngOnInit() {
    this.route.queryParams.subscribe(params => {
      console.log(JSON.stringify(params))
      const code = params['code'];
      if (code) {
        // Use the code as needed
        console.log('Authorization Code:', code);
        // Now you can proceed with exchanging the code for an access token
        // and perform further actions with the Strava API.
      }
    });
  }
  loginWithStrava() {
    window.location.href = `https://www.strava.com/oauth/authorize?client_id=110328&redirect_uri=http://localhost:4200/strava_response&response_type=code&scope=activity:read_all`;

  }


  private filterIndexes(indexes: number[]): void {
    this.filteredData = this.parsedData.map(row =>
      indexes.map(index => row[index])

    );
  }

  private formatNumber(value: number): string {
    return value.toFixed(0);
  }




}

