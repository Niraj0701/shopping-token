import { Router } from "@angular/router";
import { Component, OnInit } from "@angular/core";
import {
  FormBuilder,
  FormGroup,
  FormControl,
  Validators,
} from "@angular/forms";
import { LoaderService } from "src/app/services/api/loading.service";
import { ApiService } from "src/app/services/api/api.service";
import { Storage } from '@ionic/storage';


@Component({
  selector: "app-signup-form",
  templateUrl: "./signup-form.component.html",
  styleUrls: ["./signup-form.component.scss"],
})
export class SignupFormComponent implements OnInit {
  isUser: boolean;
  signupForm: FormGroup;
  public countries: any[] = [];
  constructor(
    private formBuilder: FormBuilder,
    private loading: LoaderService,
    private router: Router,
    private apiService: ApiService,
    private storage: Storage
  ) {}

  ngOnInit() {
    this.apiService.getCountries().subscribe((countries) => {
      this.countries = this.countries.concat(countries);
    });
    this.signupForm = new FormGroup({
      name: new FormControl("", [Validators.required]),
      password: new FormControl("", [Validators.required]),
      email: new FormControl("", [Validators.required]),
      country: new FormControl("", [Validators.required]),
      country_code: new FormControl("", [Validators.required]),
      mobile: new FormControl("", [
        Validators.required,
        Validators.minLength(10),
        Validators.maxLength(10),
      ]),
      profile: new FormControl("", [Validators.required]),
    });
  }

  typeChanged(event) {
    this.isUser = event.target.value === "service_provider";
    this.storage.set("profile", event.target.value);
    this.signupForm.controls["profile"].setValue(event.target.value);
  }

  onSubmit() {
    const body = this.signupForm.value;
    if (this.signupForm.valid) {
      this.loading.show();
      this.apiService.signup(body).subscribe(
        (data) => {
          this.loading.hide();
          this.router.navigate(["/"]);
        },
        (err) => {
          this.loading.hide();
          if (err.status === 500) {
            alert("User already exits");
          }
        }
      );
    } else {
    }
  }

  selectCountry(e) {
    let code = this.countries.filter(
      (country) => country.Name === e.detail.value
    );
    this.signupForm.controls.country_code.setValue(code[0].Dial);
  }

  goBack() {
    this.router.navigate(["/login"]);
  }
}
