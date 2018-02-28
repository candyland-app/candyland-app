import { TestBed, inject } from '@angular/core/testing';

import { PaymentServiceService } from './payment-service.service';

describe('PaymentServiceService', () => {
	beforeEach(() => {
		TestBed.configureTestingModule({
			providers: [PaymentServiceService]
		});
	});

	it('should ...', inject([PaymentServiceService], (service: PaymentServiceService) => {
		expect(service).toBeTruthy();
	}));
});
