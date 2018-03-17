import { inject, TestBed } from '@angular/core/testing';

import { GetEventService } from './get-event.service';

describe('GetEventService', () => {
    beforeEach(() => {
        TestBed.configureTestingModule({
            providers: [GetEventService]
        });
    });

    it(
        'should be created',
        inject([GetEventService], (service: GetEventService) => {
            expect(service).toBeTruthy();
        })
    );
});
