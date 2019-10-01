import { TestBed } from '@angular/core/testing';

import { AddtasksService } from './addtasks.service';

describe('AddtasksService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: AddtasksService = TestBed.get(AddtasksService);
    expect(service).toBeTruthy();
  });
});
