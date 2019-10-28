import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ListOrderPage } from './list-order.page';

describe('ListOrderPage', () => {
  let component: ListOrderPage;
  let fixture: ComponentFixture<ListOrderPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ListOrderPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ListOrderPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
