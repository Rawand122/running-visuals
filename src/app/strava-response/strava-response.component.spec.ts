import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StravaResponseComponent } from './strava-response.component';

describe('StravaResponseComponent', () => {
  let component: StravaResponseComponent;
  let fixture: ComponentFixture<StravaResponseComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [StravaResponseComponent]
    });
    fixture = TestBed.createComponent(StravaResponseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
