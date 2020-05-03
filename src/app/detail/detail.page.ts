import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormGroup, FormControl } from '@angular/forms';
import { ApiService } from '../services/api/api.service';
import { LoaderService } from '../services/api/loading.service';

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
  
  constructor(private router: Router,  
    private loading: LoaderService,
    private apiService: ApiService) { }

  ngOnInit() {
    this.shop = this.router.getCurrentNavigation().extras.state.bookdetails;
    this.commentForm = new FormGroup({
      comment: new FormControl(""),
    });
  }

  goBack() {
    this.router.navigate(["/menu/time-slots"]);
  }

  navigateToList(business_type?: string) {
    const comment = this.commentForm.get('comment').value;
    this.shop = {...this.shop, comment: comment};
    this.loading.show();
    this.apiService.bookNowSlot(this.shop).subscribe(
      (data) => {
        this.loading.hide();
        this.router.navigate(["/menu/book-success"], {
          state: { bookDetails: data },
        });
       /*  this.router.navigate(["/menu/book-success"], {
          state: { bookDetails: {...this.shop, comment: comment} },
        }); */
      },
      (error) => {
        console.log("ERROR: ", error);
        this.loading.hide();
      }
    );
  }



}
