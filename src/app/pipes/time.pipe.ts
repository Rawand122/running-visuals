import {Pipe, PipeTransform} from '@angular/core';

@Pipe({
  name: 'time'
})
export class TimePipe implements PipeTransform {
  transform(valueInSeconds: number): string {
    const hours = Math.floor(valueInSeconds / 3600);
    const remainingSeconds = valueInSeconds % 3600;
    const minutes = Math.floor(remainingSeconds / 60);
    const seconds = (remainingSeconds % 60).toFixed(0).padStart(2, '0');

    if (hours > 0) {
      return `${hours}:${minutes}:${seconds}`;
    } else {
      return `${minutes}:${seconds}`;
    }
  }


}
