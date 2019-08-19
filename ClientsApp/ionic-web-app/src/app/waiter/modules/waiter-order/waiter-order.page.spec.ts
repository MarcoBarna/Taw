import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { WaiterOrderPage } from './waiter-order.page';

describe('WaiterOrderPage', () => {
  let component: WaiterOrderPage;
  let fixture: ComponentFixture<WaiterOrderPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ WaiterOrderPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WaiterOrderPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
