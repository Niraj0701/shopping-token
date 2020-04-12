import { Component, OnInit } from "@angular/core";
import { MenuController } from "@ionic/angular";
import * as moment from "moment";

@Component({
  selector: "app-business-profile",
  templateUrl: "./business-profile.page.html",
  styleUrls: ["./business-profile.page.scss"],
})
export class BusinessProfilePage implements OnInit {
  daysList: string[] = [];
  constructor(private menu: MenuController) {}

  ngOnInit() {
    var startOfWeek = moment().startOf("week");
    var endOfWeek = moment().add(3, "days");

    var day = startOfWeek;

    while (day <= endOfWeek) {
      this.daysList.push(day.toDate().toString());
      day = day.clone().add(1, "d");
    }

    console.log(this.daysList, startOfWeek, endOfWeek);
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
}
