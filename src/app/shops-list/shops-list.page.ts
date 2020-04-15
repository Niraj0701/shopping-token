import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ApiService } from './../services/api/api.service';

@Component({
  selector: 'app-shops-list',
  templateUrl: './shops-list.page.html',
  styleUrls: ['./shops-list.page.scss'],
})
export class ShopsListPage implements OnInit {

  coords: any = {};
  shopsList: any;
  constructor(private route: Router, private apiService: ApiService) { }

  ngOnInit() {
    this.coords = this.route.getCurrentNavigation().extras.state.coords;
    this.getAllShops('grocery', this.coords['lat'], this.coords['long'])
  }

  goToSlots(shop: any) {
    this.route.navigate(['/time-slots'], { state: { shop: shop }});
  }

  getAllShops(type, lat, long) {
    this.apiService.getShopList('GROCERY', lat, long).subscribe(data => {
      console.log('*** : ', data);
      this.shopsList = data;
    }, error => {
      console.log('ERROR: ', error)
    })
  }

}
