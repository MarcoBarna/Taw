import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CookPage } from './cook.page';

describe('CookPage', () => {
  let component: CookPage;
  let fixture: ComponentFixture<CookPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CookPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CookPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
