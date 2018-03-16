import { inject, TestBed } from '@angular/core/testing';

import { RemoveEventService } from './remove-event.service';

describe('RemoveEventService', () => {
    beforeEach(() => {
        TestBed.configureTestingModule({
            providers: [RemoveEventService]
        });
    });

    it(
        'should be created',
        inject([RemoveEventService], (service: RemoveEventService) => {
            expect(service).toBeTruthy();
        })
    );
});
