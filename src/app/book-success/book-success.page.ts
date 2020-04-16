import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
@Component({
  selector: "app-book-success",
  templateUrl: "./book-success.page.html",
  styleUrls: ["./book-success.page.scss"],
})
export class BookSuccessPage implements OnInit {
  bookDetails: any;
  constructor(private route: Router) {}

  ngOnInit() {
    this.bookDetails = this.route.getCurrentNavigation().extras.state.bookDetails;
  }
}
