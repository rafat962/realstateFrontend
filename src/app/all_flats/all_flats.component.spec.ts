/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { All_flatsComponent } from './all_flats.component';

describe('All_flatsComponent', () => {
  let component: All_flatsComponent;
  let fixture: ComponentFixture<All_flatsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ All_flatsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(All_flatsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
