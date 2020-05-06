import { Pipe, PipeTransform } from "@angular/core";
import * as moment from "moment";
/*
 * Raise the value exponentially
 * Takes an exponent argument that defaults to 1.
 * Usage:
 *   value | exponentialStrength:exponent
 * Example:
 *   {{ 2 | exponentialStrength:10 }}
 *   formats to: 1024
 */

@Pipe({ name: "disabled" })
export class DisablePipe implements PipeTransform {
  transform(time: any, isTimedisabled) {
    var endTime = moment(new Date(), ["hh:mm A"]);
    var beginningTime = moment(time, ["hh:mm A"]);
    if (isTimedisabled !== null) {
      return beginningTime.isBefore(endTime);
    }
    return false;
  }
}
