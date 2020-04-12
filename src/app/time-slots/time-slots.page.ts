import { Component, OnInit } from '@angular/core';
import * as moment from 'moment';

@Component({
  selector: 'app-time-slots',
  templateUrl: './time-slots.page.html',
  styleUrls: ['./time-slots.page.scss'],
})
export class TimeSlotsPage implements OnInit {

  datesAndDays = [];
  weekdays = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat']
  constructor() { }

  ngOnInit() {
    [0, 1, 2].forEach(item => {
      console.log('*** : ', this.weekdays[this.getDate(item).getDay()]);
      this.datesAndDays.push({
        date: this.getDate(item).getDate(),
        present: new Date().getDate() === this.getDate(item).getDate(),
        day: this.weekdays[this.getDate(item).getDay()]
      })
      
    })
  }

  getDate(val: number): any {
    var day = new Date();
    let newDate = day.setDate(day.getDate() + val)
    return new Date(newDate);
  }

  dayInParts(timeSlots, start, end) {
    return timeSlots.filter(time => time > start && time < end);
  };

}
