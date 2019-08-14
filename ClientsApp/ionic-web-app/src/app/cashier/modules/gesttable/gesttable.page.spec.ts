import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GesttablePage } from './gesttable.page';

describe('GesttablePage', () => {
  let component: GesttablePage;
  let fixture: ComponentFixture<GesttablePage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GesttablePage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GesttablePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
