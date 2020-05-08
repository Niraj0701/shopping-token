import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import * as moment from "moment";
import { LoaderService } from "src/app/services/api/loading.service";
import { ApiService } from "src/app/services/api/api.service";

@Component({
  selector: "app-my-booked-slots",
  templateUrl: "./my-booked-slots.page.html",
  styleUrls: ["./my-booked-slots.page.scss"],
})
export class MyBookedSlotsPage implements OnInit {
  currentDate: any;
  listBookedSlots: any = [];
  daysList: string[] = [];
  bookedSlots: any;
  isDateActive: any = undefined;
  viewDetailSlots: any;
  responseSlot: any;
  constructor(
    private loading: LoaderService,
    private route: Router,
    private apiService: ApiService
  ) {}

  ngOnInit() {
    var currentDate = moment();
    var endOfWeek = moment().add(3, "days");

    var day = currentDate;
    this.daysList = [];
    while (day <= endOfWeek) {
      this.daysList.push(day.toDate().toString());
      day = day.clone().add(1, "d");
    }
  }
  selectDate(selectedDate, index?: any) {
    this.isDateActive = index;
    this.currentDate = moment(selectedDate).format("YYYY-MM-DD");
    this.apiService.me().subscribe((my) => {
      this.apiService
        .myBookedSlots(this.currentDate, my["user"].id)
        .subscribe((data) => {
          this.listBookedSlots = data;
        });
    });
  }
}
