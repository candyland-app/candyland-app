import { TestBed, inject } from '@angular/core/testing';

import { AddUserService } from './add-user.service';

describe('AddUserService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [AddUserService]
    });
  });

  it('should ...', inject([AddUserService], (service: AddUserService) => {
    expect(service).toBeTruthy();
  }));
});
