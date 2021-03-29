import { ChangeDetectorRef, Component, OnDestroy, OnInit } from '@angular/core';
import { IEvent, CheckoutStep } from 'src/app/shared/models/event-interface';
import { CheckoutFormComponent } from './components/checkout-form/checkout-form.component';
import { Subscription } from 'rxjs';
import { ActivatedRoute } from '@angular/router';
import { CheckoutService } from './services/checkout.service';
import { Location } from '@angular/common';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.scss'],
  providers: [CheckoutFormComponent],
})
export class CheckoutComponentComponent implements OnInit, OnDestroy {
  currentEvent: IEvent;
  allCheckoutStep = CheckoutStep;
  currentCheckoutStep: CheckoutStep = CheckoutStep.TICKET_SELECTION;
  subscription = new Subscription();

  constructor(
    private route: ActivatedRoute,
    private checkoutService: CheckoutService,
    private location: Location,
    private changeRef: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    this.subscription.add(
      this.route.data.subscribe((data) => {
        this.currentEvent = data['event'];
        this.checkoutService.setCurrentEvent(this.currentEvent);
      })
    );

    this.subscription.add(
      this.checkoutService.currentCheckoutStep$.subscribe((step) => {
        this.currentCheckoutStep = step;
        this.changeRef.detectChanges();
      })
    );
  }

  navigateBack() {
    this.location.back();
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}
