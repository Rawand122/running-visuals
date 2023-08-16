import {Component, Inject, InjectionToken} from '@angular/core';
import {MAT_DIALOG_DATA} from "@angular/material/dialog";
import {DetailedActivity} from "../models/detailed-activity.model";

const GOOGLE = new InjectionToken('google');
const googleFactory = () => google;

@Component({
  selector: 'app-map-popup',
  templateUrl: './map-popup.component.html',
  styleUrls: ['./map-popup.component.css'],
  providers: [{provide: GOOGLE, useFactory: googleFactory}]
})
export class MapPopupComponent {

  zoom: any;
  width: any;
  center: any;
  options: any;
  polylineOptions: any;
  path: any;
  // @ts-ignore
  bounds: any;
  detailedActivity!: DetailedActivity;

  // @ts-ignore
  constructor(@Inject(GOOGLE) google, @Inject(MAT_DIALOG_DATA) public data: any) {

    this.zoom = data.zoom;
    this.width = data.width;
    this.center = data.center;
    this.options = data.options;
    this.polylineOptions = google.maps.PolylineOptions;
    this.path = data.path;
    this.detailedActivity = data.detailedActivity;

    // @ts-ignore
    this.path.map((x) => {
      this.bounds = new google.maps.LatLngBounds;
      this.bounds.extend(x)

    })
  }

}
