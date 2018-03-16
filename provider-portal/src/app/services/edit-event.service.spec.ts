import { inject, TestBed } from '@angular/core/testing';

import { EditEventService } from './edit-event.service';

describe('EditEventService', () => {
    beforeEach(() => {
        TestBed.configureTestingModule({
            providers: [EditEventService]
        });
    });

    it(
        'should be created',
        inject([EditEventService], (service: EditEventService) => {
            expect(service).toBeTruthy();
        })
    );
});
