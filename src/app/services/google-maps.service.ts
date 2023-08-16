import {Injectable} from '@angular/core';


declare var google: any;

@Injectable({
  providedIn: 'root'
})
export class GoogleMapsService {

  constructor() {
  }

  decodePolyline(polyline: string): google.maps.LatLng[] {
    return google.maps.geometry.encoding.decodePath(polyline) as google.maps.LatLng[];
  }
}
