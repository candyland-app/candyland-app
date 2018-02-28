import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { OrderViewerComponent } from './order-viewer.component';

describe('OrderViewerComponent', () => {
	let component: OrderViewerComponent;
	let fixture: ComponentFixture<OrderViewerComponent>;

	beforeEach(async(() => {
		TestBed.configureTestingModule({
			declarations: [OrderViewerComponent]
		})
			.compileComponents();
	}));

	beforeEach(() => {
		fixture = TestBed.createComponent(OrderViewerComponent);
		component = fixture.componentInstance;
		fixture.detectChanges();
	});

	it('should create', () => {
		expect(component).toBeTruthy();
	});
});
