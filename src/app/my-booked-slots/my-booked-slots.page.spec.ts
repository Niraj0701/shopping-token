import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { MyBookedSlotsPage } from './my-booked-slots.page';

describe('MyBookedSlotsPage', () => {
  let component: MyBookedSlotsPage;
  let fixture: ComponentFixture<MyBookedSlotsPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MyBookedSlotsPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(MyBookedSlotsPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
