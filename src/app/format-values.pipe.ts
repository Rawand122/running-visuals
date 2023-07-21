import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'formatValues'
})
export class FormatValuesPipe implements PipeTransform {
  transform(array: string[]): string[] {
    const newValue = 'hi'; // Set the new value here

    if (array.length > 0) {
      if (array[0] !== 'Run') {
      
        array[2]=this.convertSecondsToHMS(array[2]);
        array[3]=this.convertSecondsToHMS(array[3]);
        array[4]=this.convertMetersToKilometers(array[4]);
        array[5]=this.calculateSpeed(array[5]);
        array[6]=this.convertMetersToStringWithTwoDecimals(array[6]);
        array[7]=this.convertMetersToStringWithTwoDecimalsNegative(array[7]);
        array[8]=this.convertMetersToStringWithTwoDecimals(array[8]);
        array[9]=this.convertMetersToStringWithTwoDecimals(array[9]);
        array[10]=this.convertToStringWithTwoDecimals(array[10]);
        array[11]=this.convertToStringWithTwoDecimals(array[11]);
        array[12]=this.convertToStringWithTwoDecimals(array[12]);
        return array;
      }
    }
    return array;
  }



  private convertSecondsToHMS(totalSecondsStr: string): string {
    const totalSeconds: number = parseFloat(totalSecondsStr);
    
    if (isNaN(totalSeconds)) {
      return '';
    }
  
    const hours: number = Math.floor(totalSeconds / 3600);
    const remainingSeconds: number = totalSeconds % 3600;
    const minutes: number = Math.floor(remainingSeconds / 60);
    const seconds: number = remainingSeconds % 60;

  
    let result = '';
    if (hours > 0) {
      result += `${hours} hrs, `;
    }
    result += `${minutes} min, ${seconds} sec`;
  
    return result;
  }

  private  convertMetersToKilometers(metersStr: string): string {
    const meters: number = parseFloat(metersStr);
  
    if (isNaN(meters)) {
      return '.';
    }
  
    const kilometers: number = meters / 1000;
  
    return `${kilometers.toFixed(2)} Km`;
  }

  private calculateSpeed(metersPerSecondStr: string): string {
    const metersPerSecond: number = parseFloat(metersPerSecondStr);
  
    if (isNaN(metersPerSecond)) {
      return 'Invalid input. Please provide a valid number.';
    }
  
    const kilometersPerHour: number = metersPerSecond * 3.6;

  
    return `${kilometersPerHour.toFixed(2)} km/h`;
  }

  private convertMetersToStringWithTwoDecimals(metersStr: string): string {
    const meters: number = parseFloat(metersStr);
  
    if (isNaN(meters)) {
      return 'Invalid input. Please provide a valid number.';
    }
  
    const metersString: string = meters.toFixed(2);
  
    return `${metersString} meters`;
  }

  private convertMetersToStringWithTwoDecimalsNegative(metersStr: string): string {
    const meters: number = parseFloat(metersStr);
  
    if (isNaN(meters)) {
      return '';
    }
  
    const metersString: string = Math.abs(meters).toFixed(2);
  
    return `${meters < 0 ? '-' : ''}${metersString} meters`;
  }

  private convertToStringWithTwoDecimals(metersStr: string): string {
    const meters: number = parseFloat(metersStr);
  
    if (isNaN(meters)) {
      return '';
    }
  
    const valueString: string = meters.toFixed(2);
  
    return `${valueString}`;
  }
}
