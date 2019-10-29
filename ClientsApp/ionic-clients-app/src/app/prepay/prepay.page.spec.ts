import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PrepayPage } from './prepay.page';

describe('PrepayPage', () => {
  let component: PrepayPage;
  let fixture: ComponentFixture<PrepayPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PrepayPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PrepayPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
