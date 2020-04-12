import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { ShopsListPage } from './shops-list.page';

describe('ShopsListPage', () => {
  let component: ShopsListPage;
  let fixture: ComponentFixture<ShopsListPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ShopsListPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(ShopsListPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
