import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewordersPage } from './vieworders.page';

describe('ViewordersPage', () => {
  let component: ViewordersPage;
  let fixture: ComponentFixture<ViewordersPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ViewordersPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewordersPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
