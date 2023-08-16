import {Pipe, PipeTransform} from '@angular/core';

@Pipe({
  name: 'speed'
})
export class SpeedPipe implements PipeTransform {

  transform(value: number): string {
    const speedInKilometersPerHour = value * 3.6; // Convert from meters per second to kilometers per hour
    const formattedSpeed = speedInKilometersPerHour.toFixed(2); // Format to two decimal places
    return formattedSpeed + ' km/h';
  }

}
