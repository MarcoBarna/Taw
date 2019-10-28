import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NewlistOrderPage } from './newlist-order.page';

describe('NewlistOrderPage', () => {
  let component: NewlistOrderPage;
  let fixture: ComponentFixture<NewlistOrderPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NewlistOrderPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NewlistOrderPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
