import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { MenuController } from "@ionic/angular";
import * as moment from "moment";
import { LoaderService } from "src/app/services/api/loading.service";
import { ApiService } from "src/app/services/api/api.service";

@Component({
  selector: "app-business-profile",
  templateUrl: "./business-profile.page.html",
  styleUrls: ["./business-profile.page.scss"],
})
export class BusinessProfilePage implements OnInit {
  daysList: string[] = [];
  bookedSlots: any;
  isDateActive: any = undefined;
  viewDetailSlots: any;
  responseSlot: any;
  constructor(
    private loading: LoaderService,
    private apiService: ApiService,
    private menu: MenuController,
    private route: Router
  ) {
    this.responseSlot = [];
    this.bookedSlots = this.route.getCurrentNavigation().extras.state.business;
  }

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
  openFirst() {
    this.menu.enable(true, "first");
    this.menu.open("first");
  }

  openEnd() {
    this.menu.open("end");
  }

  openCustom() {
    this.menu.enable(true, "custom");
    this.menu.open("custom");
  }

  goBack() {
    this.route.navigate(["/menu/view-businesses"]);
  }

  selectDate(selectedDate, index?: any) {
    this.isDateActive = index;
    this.apiService
      .getBookedSlots(
        moment(selectedDate).format("YYYY-MM-DD"),
        this.bookedSlots.id,
        this.bookedSlots.business_type
      )
      .subscribe((data) => {
        this.responseSlot = data;
        let obj = {};
        for (var i = 0; i < this.responseSlot.length; i++) {
          if (!obj.hasOwnProperty(this.responseSlot[i].slot)) {
            obj[this.responseSlot[i].slot] = [];
          }
          obj[this.responseSlot[i].slot].push(this.responseSlot[i].user);
        }
        this.viewDetailSlots = obj;
      });
  }

  keys(): Array<string> {
    return Object.keys(this.viewDetailSlots);
  }
}
