import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { KitchenquePage } from './kitchenque.page';

describe('KitchenquePage', () => {
  let component: KitchenquePage;
  let fixture: ComponentFixture<KitchenquePage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ KitchenquePage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(KitchenquePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
