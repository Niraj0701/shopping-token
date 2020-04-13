import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import { LoaderService } from 'src/app/services/api/loading.service';

@Component({
  selector: 'app-signup-form',
  templateUrl: './signup-form.component.html',
  styleUrls: ['./signup-form.component.scss'],
})
export class SignupFormComponent implements OnInit {

  isUser: boolean;
  signupForm: FormGroup;
  constructor(private formBuilder: FormBuilder, 
    private loading: LoaderService,
    private router: Router) { }

  ngOnInit() {
    this.signupForm = new FormGroup({
      name: new FormControl('', [Validators.required]),
      password: new FormControl('', [Validators.required]),
      mobile: new FormControl('', [Validators.required, Validators.minLength(10)]),
      user_type: new FormControl('', [Validators.required]),
      service: new FormControl('', [Validators.required])
    });
  }

  typeChanged(event) {
    this.isUser = event.target.value === 'service_provider';
    this.signupForm.controls['user_type'].setValue(event.target.value);
  }

  onSubmit(){
    this.loading.show();
    setTimeout(()=> {
      this.loading.hide();
      this.router.navigate(['/signup/verify'])
    }, 3000)
    
    console.log('***: ', this.signupForm.value)
  }

}
