import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.page.html',
  styleUrls: ['./profile.page.scss'],
})
export class ProfilePage implements OnInit {

  profileForm: FormGroup;
  constructor(private formBuilder: FormBuilder) { }

  ngOnInit() {
    this.profileForm = new FormGroup({
      service: new FormControl('', [Validators.required]),
      location: new FormControl('', [Validators.required]),
      workDays: new FormControl('', [Validators.required]),
      timeperPerson: new FormControl('', [Validators.required]),
      peronsPerSlot: new FormControl('', [Validators.required]),
    });
  }

  onSubmit() {
  }

  getCoords(event) {
    /* this.profileForm.controls['latitude'].setValue(event.lat);
    this.completeProfile.controls['longitude'].setValue(event.long); */
  }

}
