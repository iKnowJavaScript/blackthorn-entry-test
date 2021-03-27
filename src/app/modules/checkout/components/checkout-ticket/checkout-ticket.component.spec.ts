import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CheckoutTicketComponent } from './checkout-ticket.component';

describe('CheckoutTicketComponent', () => {
  let component: CheckoutTicketComponent;
  let fixture: ComponentFixture<CheckoutTicketComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CheckoutTicketComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CheckoutTicketComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
