import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GestitemPage } from './gestitem.page';

describe('GestitemPage', () => {
  let component: GestitemPage;
  let fixture: ComponentFixture<GestitemPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GestitemPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GestitemPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
