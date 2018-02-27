import { TestBed, inject } from '@angular/core/testing';

import { GetUserService } from './get-user.service';

describe('GetUserService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [GetUserService]
    });
  });

  it('should ...', inject([GetUserService], (service: GetUserService) => {
    expect(service).toBeTruthy();
  }));
});
