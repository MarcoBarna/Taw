import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TablestatusPage } from './tablestatus.page';

describe('TablestatusPage', () => {
  let component: TablestatusPage;
  let fixture: ComponentFixture<TablestatusPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TablestatusPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TablestatusPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
