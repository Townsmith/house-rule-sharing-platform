import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HrSearchbarComponent } from './hr-searchbar.component';

describe('HrSearchbarComponent', () => {
  let component: HrSearchbarComponent;
  let fixture: ComponentFixture<HrSearchbarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HrSearchbarComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(HrSearchbarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
