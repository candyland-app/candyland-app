import { inject, TestBed } from '@angular/core/testing';

import { GetEventListService } from './get-event-list.service';

describe('GetEventListService', () => {
    beforeEach(() => {
        TestBed.configureTestingModule({
            providers: [GetEventListService]
        });
    });

    it(
        'should be created',
        inject([GetEventListService], (service: GetEventListService) => {
            expect(service).toBeTruthy();
        })
    );
});
