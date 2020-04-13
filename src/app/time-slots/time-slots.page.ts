import { Component, OnInit } from '@angular/core';
import * as moment from 'moment';

@Component({
  selector: 'app-time-slots',
  templateUrl: './time-slots.page.html',
  styleUrls: ['./time-slots.page.scss'],
})
export class TimeSlotsPage implements OnInit {

  datesAndDays = [];
  selectedSlot: any;
  weekdays = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
  public shop = {
    "name": "The Walnut Baner",
    "coords": {
      "longitude": 73.7866886,
      "latitude": 18.5597859
    },
    "id": 4,
    "business_type": "GROCERY",
    "users_allowed": 12,
    "slot_size_min": 20,
    "slots": [
      "09:00",
      "09:20",
      "09:40",
      "10:00",
      "10:20",
      "10:40",
      "11:00",
      "11:20",
      "11:40",
      "12:00",
      "12:20",
      "12:40",
      "13:00",
      "13:20",
      "13:40",
      "14:00",
      "14:20",
      "14:40",
      "15:00",
      "15:20",
      "15:40",
      "16:00",
      "16:20",
      "16:40"
    ],
    "start_time": "09:00:00",
    "end_time": "17:00:00",
    "address": null
  }
  constructor() { }

  ngOnInit() {
    [0, 1, 2].forEach(item => {
      this.datesAndDays.push({
        date: this.getDate(item).getDate(),
        present: new Date().getDate() === this.getDate(item).getDate(),
        day: this.weekdays[this.getDate(item).getDay()]
      })

    })
  }

  getTime(time) {
    return moment(time, ["hh:mm A"]).format("hh:mm A");
  }

  getDate(val: number): any {
    var day = new Date();
    let newDate = day.setDate(day.getDate() + val)
    return new Date(newDate);
  }

  dayInParts(timeSlots, start, end) {
    return timeSlots.filter(time => time > start && time <= end);
  };


  select(index: number) {
    this.selectedSlot = index;
  }

}
