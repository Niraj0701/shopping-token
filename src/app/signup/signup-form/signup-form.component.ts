import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-signup-form',
  templateUrl: './signup-form.component.html',
  styleUrls: ['./signup-form.component.scss'],
})
export class SignupFormComponent implements OnInit {

  signupForm: FormGroup;
  constructor(private formBuilder: FormBuilder) { }

  ngOnInit() {
    this.signupForm = new FormGroup({
      name: new FormControl('Test', [Validators.required]),
      password: new FormControl('Test', [Validators.required]),
      mobile: new FormControl('0123456789', [Validators.required, Validators.minLength(10)]),
      service: new FormControl('Grocery', [Validators.required])
    });
  }

}
