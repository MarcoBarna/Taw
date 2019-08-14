import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { StatdetailsPage } from './statdetails.page';

describe('StatdetailsPage', () => {
  let component: StatdetailsPage;
  let fixture: ComponentFixture<StatdetailsPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ StatdetailsPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StatdetailsPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
