/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { Flat_headerComponent } from './flat_header.component';

describe('Flat_headerComponent', () => {
  let component: Flat_headerComponent;
  let fixture: ComponentFixture<Flat_headerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ Flat_headerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(Flat_headerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
