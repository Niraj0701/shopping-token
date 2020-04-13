import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-signin',
  templateUrl: './signin.page.html',
  styleUrls: ['./signin.page.scss'],
})
export class SigninPage implements OnInit {

  signinForm: FormGroup;
  constructor(private formBuilder: FormBuilder, private router: Router) { }

  ngOnInit() {
    this.signinForm = new FormGroup({
      name: new FormControl('Niraj', [Validators.required]),
      password: new FormControl('niraj', [Validators.required]),
    });
  }

  onSubmit() {
    localStorage.setItem('user', 'niraj');
    localStorage.setItem('password', 'niraj');
    if(localStorage.getItem('user_type')==='service_provider') {
      this.router.navigate(['/business-profile'])  
      return;
    }
    this.router.navigate(['/user-services'])
  }


}
