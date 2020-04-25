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
  private businesses: any = [];
  constructor(
    private loading: LoaderService,
    private route: Router,
    private apiService: ApiService
  ) {}

  ngOnInit() {
    this.businesses = this.route.getCurrentNavigation().extras.state.businesses;
    console.log("in ngOninit", this.businesses);
    // this.apiService.userProfile.pipe(first()).subscribe((user) => {
    //   console.log("user1", user);
    //   this.businesses = user.businesses;
    // });
  }

  viewBookedSlots(business) {
    console.log(business);
    this.route.navigate(["/business-profile"], {
      state: { business: business },
    });
  }
}
