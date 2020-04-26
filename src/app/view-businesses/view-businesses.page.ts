import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { LoaderService } from "src/app/services/api/loading.service";
import { ApiService } from "src/app/services/api/api.service";
import { first } from "rxjs/operators";

@Component({
  selector: "app-view-businesses",
  templateUrl: "./view-businesses.page.html",
  styleUrls: ["./view-businesses.page.scss"],
})
export class ViewBusinessesPage implements OnInit {
  private businesses: any;
  constructor(
    private loading: LoaderService,
    private route: Router,
    private apiService: ApiService
  ) { }

  ngOnInit() {
    if (this.route.getCurrentNavigation().extras.state) {
      this.businesses = this.route.getCurrentNavigation().extras.state.businesses;
    } else {
      this.apiService.me().subscribe((user) => {
        console.log("user1", user);
        this.businesses = user;
      });
    }
  }

  viewBookedSlots(business) {
    console.log(business);
    this.route.navigate(["/menu/business-profile"], {
      state: { business: business },
    });
  }
}
