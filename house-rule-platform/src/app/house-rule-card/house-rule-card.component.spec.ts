import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HouseRuleCardComponent } from './house-rule-card.component';

describe('HouseRuleCardComponent', () => {
  let component: HouseRuleCardComponent;
  let fixture: ComponentFixture<HouseRuleCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HouseRuleCardComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(HouseRuleCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
