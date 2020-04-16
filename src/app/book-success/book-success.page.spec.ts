import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { BookSuccessPage } from './book-success.page';

describe('BookSuccessPage', () => {
  let component: BookSuccessPage;
  let fixture: ComponentFixture<BookSuccessPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BookSuccessPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(BookSuccessPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
