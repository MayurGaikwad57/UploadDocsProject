import { TestBed } from '@angular/core/testing';

import { DocValidatorServiceTsService } from './doc-validator.service.ts.service';

describe('DocValidatorServiceTsService', () => {
  let service: DocValidatorServiceTsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DocValidatorServiceTsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
