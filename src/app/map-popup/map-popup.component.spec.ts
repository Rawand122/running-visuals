import {ComponentFixture, TestBed} from '@angular/core/testing';

import {MapPopupComponent} from './map-popup.component';
import {MAT_DIALOG_DATA, MatDialogModule} from "@angular/material/dialog";
import {InjectionToken} from "@angular/core";
import {MatIconModule} from "@angular/material/icon";
import {GoogleMapsModule} from "@angular/google-maps";


describe('MapPopupComponent', () => {
  let component: MapPopupComponent;
  let fixture: ComponentFixture<MapPopupComponent>;
  const googleMock = {
    maps: {
      PolylineOptions: jasmine.createSpy('PolylineOptions'),
    },
  };

// Create a mock for the MAT_DIALOG_DATA
  const mockDialogData = {
    zoom: 15,
    width: 500,
    center: {lat: 0, lng: 0},
    options: {mapTypeId: 'roadmap', zoomControl: false, mapTypeControl: false, streetViewControl: false},
    path: []

  };
  beforeEach(() => {
    let mockedGoogle;
    TestBed.configureTestingModule({
      declarations: [MapPopupComponent],
      providers: [
        {provide: new InjectionToken('google'), useValue: googleMock},
        {provide: MAT_DIALOG_DATA, useValue: mockDialogData},
      ],
      imports: [MatDialogModule, MatIconModule, GoogleMapsModule]
    });

    // @ts-ignore

    fixture = TestBed.createComponent(MapPopupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });


});
