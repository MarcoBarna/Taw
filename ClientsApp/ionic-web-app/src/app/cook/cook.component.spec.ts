import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CookComponent } from './cook.component';

describe('CookComponent', () => {
  let component: CookComponent;
  let fixture: ComponentFixture<CookComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CookComponent ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CookComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
