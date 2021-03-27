import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CheckoutComponentComponent } from './checkout.component';
import { CheckoutFormComponent } from './components/checkout-form/checkout-form.component';
import { CheckoutTicketComponent } from './components/checkout-ticket/checkout-ticket.component';
import { OrderExistGuard } from './guards/ticket.guard';
import { EventResolverService } from './services/event-resolver.service';

const routes: Routes = [
  {
    path: '',
    resolve: { event: EventResolverService },
    component: CheckoutComponentComponent,
    children: [
      { path: '', redirectTo: 'ticket', pathMatch: 'full' },
      {
        path: 'ticket',
        component: CheckoutTicketComponent,
      },
      {
        path: 'checkout-form',
        component: CheckoutFormComponent,
        canActivate: [OrderExistGuard],
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CheckoutRoutingModule {}
