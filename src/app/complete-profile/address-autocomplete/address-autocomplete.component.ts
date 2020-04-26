import { Component, OnInit, ElementRef, ViewChild, NgZone, ViewChildren, Output, EventEmitter } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { IonInput } from '@ionic/angular';

declare let google: any;

@Component({
  selector: 'app-address-autocomplete',
  templateUrl: './address-autocomplete.component.html',
  styleUrls: ['./address-autocomplete.component.scss'],
})
export class AddressAutocompleteComponent implements OnInit {

  addressForm: FormGroup;
  autocompleteItems: any;

  @Output()
  getCoords: EventEmitter<any> = new EventEmitter<any>();

  /* @ViewChild('search', { read: ElementRef, static: false })
  autocomplete: ElementRef; */

  @ViewChild(IonInput, { static: false })
  autocomplete: IonInput;

  options = {
    componentRestrictions: { country: 'Ind' },
    types: ['establishment']  // 'establishment' / 'address' / 'geocode'
  }
  service: any;

  constructor(private ngZone: NgZone) {
  }

  updateSearch() {
    this.autocomplete.getInputElement()
      .then((input: HTMLInputElement) => {
        this.service = new google.maps.places.Autocomplete(input, this.options)
        google.maps.event.addListener(this.service, 'place_changed', () => {

          let place = this.service.getPlace().geometry.location;
          this.getCoords.emit({
              lat: place.lat(),
              long: place.lng()
          });
        });
      });
  }

  ngOnInit() {
    this.addressForm = new FormGroup({
      search: new FormControl("")
    });
    this.onChange();

  }

  ngAfterViewInit() {
    this.updateSearch();
  }

  onChange() {
  }


  onSubmit() {
  }

}
