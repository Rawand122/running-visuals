import {Injectable} from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LocalStorageService {
  private activitiesKey = 'activities';
  private activitiesTimestampKey = 'activitiesTimestamp';
  private accessTokenKey = 'accessToken';
  private athleteKey = 'athlete';

  constructor() {
  }

  setActivities(activities: any[]): void {
    localStorage.setItem(this.activitiesKey, JSON.stringify(activities));
    localStorage.setItem(this.activitiesTimestampKey, new Date().getTime().toString());
  }

  getActivities(): any[] {
    const activitiesExist = localStorage.getItem(this.activitiesKey);
    const activitiesTimestamp = localStorage.getItem(this.activitiesTimestampKey);
    if (activitiesExist && activitiesTimestamp && this.isActivitiesUpdatedWithinOneHour(Number(activitiesTimestamp))) {
      return JSON.parse(activitiesExist);
    }
    return [];
  }

  private isActivitiesUpdatedWithinOneHour(timestamp: number): boolean {
    const oneHourInMillis = 60 * 60 * 1000;
    const currentTimeInMillis = new Date().getTime();
    return currentTimeInMillis - timestamp <= oneHourInMillis;
  }

  saveAccessToken(accessToken: string): void {
    localStorage.setItem(this.accessTokenKey, JSON.stringify(accessToken));
  }

  getAccessToken(): string {
    const accessTokenExist = localStorage.getItem(this.accessTokenKey);
    if (accessTokenExist) {
      return JSON.parse(accessTokenExist);
    }
    return 'no key';
  }


}
