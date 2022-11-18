import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LikertDisplayComponent } from './likert-display.component';

describe('LikertDisplayComponent', () => {
  let component: LikertDisplayComponent;
  let fixture: ComponentFixture<LikertDisplayComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LikertDisplayComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LikertDisplayComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
