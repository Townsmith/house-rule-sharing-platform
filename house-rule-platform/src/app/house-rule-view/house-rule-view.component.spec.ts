import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HouseRuleViewComponent } from './house-rule-view.component';

describe('HouseRuleViewComponent', () => {
  let component: HouseRuleViewComponent;
  let fixture: ComponentFixture<HouseRuleViewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HouseRuleViewComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(HouseRuleViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
