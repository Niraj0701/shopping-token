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
  constructor(private route: Router, private apiService: ApiService) { }

  ngOnInit() {
    console.log('=== : ', this.route.getCurrentNavigation().extras.state.coords);
    this.coords = this.route.getCurrentNavigation().extras.state.coords;
    this.getAllShops('grocery', this.coords['lat'], this.coords['long'] )
  }

  getAllShops(type, lat, long) {
    this.apiService.getShopList(type, lat, long).subscribe(data => {
      console.log('*** : ', data);
    }, error => {
      console.log('ERROR: ', error)
    })
  }

}
