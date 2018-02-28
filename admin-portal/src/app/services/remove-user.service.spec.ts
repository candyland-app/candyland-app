import { TestBed, inject } from '@angular/core/testing';

import { RemoveUserService } from './remove-user.service';

describe('RemoveUserService', () => {
	beforeEach(() => {
		TestBed.configureTestingModule({
			providers: [RemoveUserService]
		});
	});

	it('should ...', inject([RemoveUserService], (service: RemoveUserService) => {
		expect(service).toBeTruthy();
	}));
});
