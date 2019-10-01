import { TestBed } from '@angular/core/testing';

import { PasttasksService } from './pasttasks.service';

describe('PasttasksService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: PasttasksService = TestBed.get(PasttasksService);
    expect(service).toBeTruthy();
  });
});
