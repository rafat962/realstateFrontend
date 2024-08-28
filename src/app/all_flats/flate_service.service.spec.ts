/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { Flate_serviceService } from './flate_service.service';

describe('Service: Flate_service', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [Flate_serviceService]
    });
  });

  it('should ...', inject([Flate_serviceService], (service: Flate_serviceService) => {
    expect(service).toBeTruthy();
  }));
});
