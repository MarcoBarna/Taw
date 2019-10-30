import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CardPayPage } from './card-pay.page';

describe('CardPayPage', () => {
  let component: CardPayPage;
  let fixture: ComponentFixture<CardPayPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CardPayPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CardPayPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
