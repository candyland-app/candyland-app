import { inject, TestBed } from '@angular/core/testing';

import { AddUserService } from './add-user.service';

describe('AddUserService', () => {
    beforeEach(() => {
        TestBed.configureTestingModule({
            providers: [AddUserService]
        });
    });

    it(
        'should be created',
        inject([AddUserService], (service: AddUserService) => {
            expect(service).toBeTruthy();
        })
    );
});
