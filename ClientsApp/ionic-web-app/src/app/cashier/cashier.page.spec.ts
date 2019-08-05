import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CashierPage } from './cashier.page';

describe('CashierPage', () => {
  let component: CashierPage;
  let fixture: ComponentFixture<CashierPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CashierPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CashierPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
