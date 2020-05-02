import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { ApiService } from "./../services/api/api.service";
import { LoaderService } from "../services/api/loading.service";

@Component({
  selector: "app-shops-list",
  templateUrl: "./shops-list.page.html",
  styleUrls: ["./shops-list.page.scss"],
})
export class ShopsListPage implements OnInit {
  coords: any = {};
  business_type: string;
  shopsList: any;
  constructor(
    private route: Router,
    private apiService: ApiService,
    private loading: LoaderService
  ) {}

  ngOnInit() {
    this.coords = this.route.getCurrentNavigation().extras.state.coords;
    this.business_type = this.route.getCurrentNavigation().extras.state.type;
    this.getAllShops("grocery", this.coords["lat"], this.coords["long"]);
  }

  goToSlots(shop: any) {
    alert('Hello')
    this.route.navigate(["/menu/detail"], { state: { shop: shop } });
  }

  getAllShops(type, lat, long) {
    this.loading.show();
    this.apiService.getShopList(this.business_type, lat, long).subscribe(
      (data) => {
        this.shopsList = data;
        this.loading.hide();
      },
      (error) => {
        console.log("ERROR: ", error);
        this.loading.hide();
      }
    );
  }
  goBack() {
    this.route.navigate(["/menu/user-services"]);
  }
}
