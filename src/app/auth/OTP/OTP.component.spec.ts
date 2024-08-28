/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { OTPComponent } from './OTP.component';

describe('OTPComponent', () => {
  let component: OTPComponent;
  let fixture: ComponentFixture<OTPComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OTPComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OTPComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
