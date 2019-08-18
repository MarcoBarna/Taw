import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { WaiterPage } from './waiter.page';

describe('WaiterPage', () => {
  let component: WaiterPage;
  let fixture: ComponentFixture<WaiterPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ WaiterPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WaiterPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
