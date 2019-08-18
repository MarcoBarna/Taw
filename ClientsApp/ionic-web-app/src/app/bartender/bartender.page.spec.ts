import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BartenderPage } from './bartender.page';

describe('BartenderPage', () => {
  let component: BartenderPage;
  let fixture: ComponentFixture<BartenderPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BartenderPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BartenderPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
