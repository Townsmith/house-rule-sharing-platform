import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HouseRuleCreateComponent } from './house-rule-create.component';

describe('HouseRuleCreateComponent', () => {
  let component: HouseRuleCreateComponent;
  let fixture: ComponentFixture<HouseRuleCreateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HouseRuleCreateComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(HouseRuleCreateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
