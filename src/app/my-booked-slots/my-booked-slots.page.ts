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
  constructor(
    private loading: LoaderService,
    private route: Router,
    private apiService: ApiService
  ) {}

  ngOnInit() {
    this.currentDate = moment().format("YYYY-MM-DD");
    this.apiService.me().subscribe((my) => {
      console.log("user", my["user"]);
      this.apiService
        .myBookedSlots(this.currentDate, my["user"].id)
        .subscribe((data) => {
          console.log("in my booked slots", data);
          this.listBookedSlots = data;
        });
    });
  }
}
