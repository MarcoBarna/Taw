import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GestusersPage } from './gestusers.page';

describe('GestusersPage', () => {
  let component: GestusersPage;
  let fixture: ComponentFixture<GestusersPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GestusersPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GestusersPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
