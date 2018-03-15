import { inject, TestBed } from '@angular/core/testing';

import { AddEventService } from './add-event.service';

describe('AddEventService', () => {
    beforeEach(() => {
        TestBed.configureTestingModule({
            providers: [AddEventService]
        });
    });

    it(
        'should be created',
        inject([AddEventService], (service: AddEventService) => {
            expect(service).toBeTruthy();
        })
    );
});
