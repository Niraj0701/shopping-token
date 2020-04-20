import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { ViewBusinessesPage } from './view-businesses.page';

describe('ViewBusinessesPage', () => {
  let component: ViewBusinessesPage;
  let fixture: ComponentFixture<ViewBusinessesPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ViewBusinessesPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(ViewBusinessesPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
