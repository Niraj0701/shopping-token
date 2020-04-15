import { Router } from '@angular/router';
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
  slotString: string;
  weekdays = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
  public shop = {};
  constructor(private route: Router) { }

  ngOnInit() {
    this.shop = this.route.getCurrentNavigation().extras.state.shop;

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


  select(index: number, slot: string) {
    this.selectedSlot = index;
    this.slotString = slot;
  }

}
