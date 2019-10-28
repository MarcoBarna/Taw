import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { QrCodeOrderPage } from './qr-code-order.page';

describe('QrCodeOrderPage', () => {
  let component: QrCodeOrderPage;
  let fixture: ComponentFixture<QrCodeOrderPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ QrCodeOrderPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(QrCodeOrderPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
