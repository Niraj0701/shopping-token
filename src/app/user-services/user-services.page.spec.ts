import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { UserServicesPage } from './user-services.page';

describe('UserServicesPage', () => {
  let component: UserServicesPage;
  let fixture: ComponentFixture<UserServicesPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UserServicesPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(UserServicesPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
