import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import { LoaderService } from 'src/app/services/api/loading.service';
import { ApiService } from 'src/app/services/api/api.service';

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
    private router: Router,
    private apiService: ApiService) { }

  ngOnInit() {
    this.signupForm = new FormGroup({
      name: new FormControl('', [Validators.required]),
      password: new FormControl('', [Validators.required]),
      email : new FormControl('', [Validators.required]),
      mobile: new FormControl('', [Validators.required, Validators.minLength(10)]),
      profile: new FormControl('', [Validators.required]),
      service: new FormControl('', [Validators.required])
    });
  }

  typeChanged(event) {
    this.isUser = event.target.value === 'service_provider';
    localStorage.setItem('user_type', event.target.value);
    this.signupForm.controls['user_type'].setValue(event.target.value);
  }

  onSubmit(){
    this.loading.show();
    /* setTimeout(()=> {
      this.loading.hide();
      this.router.navigate(['/signup/verify'])
    }, 3000) 
    
    
      "name": name? name: '',
      "email": email? email : '',
      "mobile": mobile,
      "profile": profile,
      "password": password
    }
    */
    const body = this.signupForm.value;
    this.apiService.signup(body)
    console.log('***: ', this.signupForm.value)
  }

}
