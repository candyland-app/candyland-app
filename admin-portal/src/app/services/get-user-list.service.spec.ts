import { inject, TestBed } from '@angular/core/testing';

import { GetUserListService } from './get-user-list.service';

describe('GetUserListService', () => {
    beforeEach(() => {
        TestBed.configureTestingModule({
            providers: [GetUserListService]
        });
    });

    it(
        'should be created',
        inject([GetUserListService], (service: GetUserListService) => {
            expect(service).toBeTruthy();
        })
    );
});
