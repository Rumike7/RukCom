import { TestBed } from '@angular/core/testing';

import { AdminEnumsService } from './admin-enums.service';

describe('AdminEnumsService', () => {
  let service: AdminEnumsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AdminEnumsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
