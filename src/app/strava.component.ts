import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {HttpClient} from "@angular/common/http";
import {LocalStorageService} from "./services/local-storage-service.service";
import {environment} from "../environments/environment";

@Component({
  selector: 'app-strava',
  templateUrl: './strava.component.html',
  styleUrls: ['./strava.component.css']
})

export class StravaComponent implements OnInit {

  constructor(private http: HttpClient, private route: ActivatedRoute, private localStorageService: LocalStorageService, private router: Router) {

  }

  ngOnInit() {
    const activitiesExist = this.localStorageService.getActivities();
    if (activitiesExist && activitiesExist.length > 0) {
      this.router.navigate(["/strava_response"])
    } else {
      window.location.href = `https://www.strava.com/oauth/authorize?client_id=${environment.stravaClientID}&redirect_uri=https://running-visual.web.app/strava_response&response_type=code&scope=activity:read_all`;
    }
  }

}

