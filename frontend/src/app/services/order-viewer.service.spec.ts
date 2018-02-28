import { TestBed, inject } from '@angular/core/testing';

import { OrderViewerService } from './order-viewer.service';

describe('OrderViewerService', () => {
	beforeEach(() => {
		TestBed.configureTestingModule({
			providers: [OrderViewerService]
		});
	});

	it('should ...', inject([OrderViewerService], (service: OrderViewerService) => {
		expect(service).toBeTruthy();
	}));
});
