import { Router } from "@angular/router";
import { Component, OnInit } from "@angular/core";
import * as moment from "moment";
import { IShop } from "../models/shop.interface";
import { ApiService } from "./../services/api/api.service";
import { LoaderService } from "../services/api/loading.service";

@Component({
  selector: "app-time-slots",
  templateUrl: "./time-slots.page.html",
  styleUrls: ["./time-slots.page.scss"],
})
export class TimeSlotsPage implements OnInit {
  datesAndDays = [];
  selectedSlot: any;
  slotString: string;
  weekdays = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  public shop: IShop;
  constructor(
    private route: Router,
    private apiService: ApiService,
    private loading: LoaderService
  ) {}

  ngOnInit() {
    this.shop = this.route.getCurrentNavigation().extras.state.shop;
    [0, 1, 2].forEach((item) => {
      this.datesAndDays.push({
        date: this.getDate(item).getDate(),
        present: new Date().getDate() === this.getDate(item).getDate(),
        day: this.weekdays[this.getDate(item).getDay()],
        fullDateFormat: moment().add(item, "days").format("YYYY-MM-DD"),
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
    this.loading.show();
    let tempObj = { ...this.shop };
    let currentDate = this.datesAndDays.filter((date) => date.present === true);

    tempObj["selectedDate"] = currentDate[0].fullDateFormat;
    tempObj["selectedTime"] = this.slotString;
    if (this.slotString) {
      this.apiService.bookNowSlot(tempObj).subscribe(
        (data) => {
          this.loading.hide();
          this.route.navigate(["/menu/book-success"], {
            state: { bookDetails: data },
          });
        },
        (error) => {
          console.log("ERROR: ", error);
          this.loading.hide();
        }
      );
    } else {
      this.loading.hide();
    }
  }
  goBack() {
    this.route.navigate(["/menu/detail"]);
  }
}
