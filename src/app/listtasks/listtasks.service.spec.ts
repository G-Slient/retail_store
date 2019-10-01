import { TestBed } from '@angular/core/testing';

import { ListtasksService } from './listtasks.service';

describe('ListtasksService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ListtasksService = TestBed.get(ListtasksService);
    expect(service).toBeTruthy();
  });
});
