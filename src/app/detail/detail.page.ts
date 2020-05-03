import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormGroup, FormControl } from '@angular/forms';

@Component({
  selector: 'app-detail',
  templateUrl: './detail.page.html',
  styleUrls: ['./detail.page.scss'],
})
export class DetailPage implements OnInit {

  coords: any = {};
  business_type: string;
  shopsList: any;
  comment: string;
  commentForm: FormGroup;
  shop: any;
  
  constructor(private router: Router) { }

  ngOnInit() {
    this.shop = this.router.getCurrentNavigation().extras.state.shop;
    this.commentForm = new FormGroup({
      comment: new FormControl(""),
    });
  }

  goBack() {
    this.router.navigate(["/menu/shops-list"]);
  }

  navigateToList(business_type?: string) {
    const comment = this.commentForm.get('comment').value
    this.router.navigate(["/menu/time-slots"], {
      state: { shop: {...this.shop, comment: comment} },
    });
  }



}
