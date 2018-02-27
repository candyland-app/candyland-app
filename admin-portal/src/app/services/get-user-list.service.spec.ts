import { TestBed, inject } from '@angular/core/testing';

import { GetUserListService } from './get-user-list.service';

describe('GetUserListService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [GetUserListService]
    });
  });

  it('should ...', inject([GetUserListService], (service: GetUserListService) => {
    expect(service).toBeTruthy();
  }));
});
