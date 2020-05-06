import { Router } from "@angular/router";
import { Component, OnInit } from "@angular/core";
import * as moment from "moment";
import { IShop } from "../models/shop.interface";
import { ApiService } from "./../services/api/api.service";
import { LoaderService } from "../services/api/loading.service";
import { DisablePipe } from "./time.pipe";
@Component({
  selector: "app-time-slots",
  templateUrl: "./time-slots.page.html",
  styleUrls: ["./time-slots.page.scss"],
  providers: [DisablePipe],
})
export class TimeSlotsPage implements OnInit {
  datesAndDays = [];
  selectedSlot: any;
  slotString: string = "";
  weekdays = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  public shop: IShop;
  isTimedisabled: any = "";
  timeSlots = [];
  constructor(
    private route: Router,
    private apiService: ApiService,
    private loading: LoaderService,
    private datePipe: DisablePipe
  ) {}
  //  new Date().getDate() === this.getDate(item).getDate()
  ngOnInit() {
    this.shop = this.route.getCurrentNavigation().extras.state.shop;
    [0, 1, 2].forEach((item) => {
      this.datesAndDays.push({
        date: moment(this.getDate(item)).format("DD"),
        present: false,
        name: `date${item}`,
        day: this.weekdays[this.getDate(item).getDay()],
        fullDate: this.getDate(item),
        fullDateFormat: moment().add(item, "days").format("YYYY-MM-DD"),
      });
    });
  }
  getSelectedDate(dateObj) {
    this.timeSlots = [];
    this.selectedSlot = null;
    this.slotString = "";
    this.datesAndDays.map((obj) => {
      if (obj.name === dateObj.name) {
        obj.present = true;
      } else {
        obj.present = false;
      }
    });
    let curr = moment(new Date()).format("YYYY-MM-DD");
    let currentDate = this.datesAndDays.filter((date) => date.present === true);
    if (moment(currentDate[0].fullDateFormat).isSame(curr)) {
      this.isTimedisabled = moment(currentDate[0].fullDate).format("hh:mm A");
    } else {
      this.isTimedisabled = null;
    }
    this.shop.slots.map((time) => {
      this.timeSlots.push({
        slot: time,
        isSlotActive: this.datePipe.transform(time, this.isTimedisabled),
      });
    });
  }

  getTime(time) {
    return moment(time, ["hh:mm A"]).format("hh:mm A");
  }

  getDate(val: number): any {
    var day = new Date();
    let newDate = day.setDate(day.getDate() + val);
    return new Date(newDate);
  }

  dayInParts(timeSlots, start, end) {
    return timeSlots.filter((time) => time > start && time <= end);
  }

  select(index: number, slot: string) {
    this.selectedSlot = index;
    this.slotString = slot;
  }

  bookNowSlot() {
    let tempObj = { ...this.shop };
    let currentDate = this.datesAndDays.filter((date) => date.present === true);
    tempObj["selectedDate"] = currentDate[0].fullDateFormat;
    tempObj["selectedTime"] = this.slotString;
    if (this.slotString) {
      this.route.navigate(["/menu/detail"], {
        state: { bookdetails: tempObj },
      });
    } else {
    }
  }
  goBack() {
    this.route.navigate(["/menu/shops-list"]);
  }
}
