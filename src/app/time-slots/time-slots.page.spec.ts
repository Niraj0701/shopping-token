import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { TimeSlotsPage } from './time-slots.page';

describe('TimeSlotsPage', () => {
  let component: TimeSlotsPage;
  let fixture: ComponentFixture<TimeSlotsPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TimeSlotsPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(TimeSlotsPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
