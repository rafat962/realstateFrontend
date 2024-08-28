/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { One_flatComponent } from './one_flat.component';

describe('One_flatComponent', () => {
  let component: One_flatComponent;
  let fixture: ComponentFixture<One_flatComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ One_flatComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(One_flatComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
