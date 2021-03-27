import { NgModule, NO_ERRORS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CheckoutTicketComponent } from 'src/app/modules/checkout/components/checkout-ticket/checkout-ticket.component';
import { CheckoutFormComponent } from 'src/app/modules/checkout/components/checkout-form/checkout-form.component';
import { CheckoutRoutingModule } from './checkout-routing.module';
import { SharedModule } from 'src/app/shared/modules/shared.module';
import { CheckoutComponentComponent } from './checkout.component';
import { OrderSummaryComponent } from './components/order-summary/order-summary.component';

@NgModule({
  declarations: [CheckoutComponentComponent, CheckoutTicketComponent, CheckoutFormComponent, OrderSummaryComponent],
  imports: [CommonModule, CheckoutRoutingModule, SharedModule],
})
export class CheckoutModule {}
