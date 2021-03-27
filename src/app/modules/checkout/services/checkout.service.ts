import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { CheckoutStep, IEvent, ISummaryItem } from 'src/app/shared/models/event-interface';

@Injectable({
  providedIn: 'root',
})
export class CheckoutService {
  currentCheckoutStep$: Observable<CheckoutStep>;
  currentCheckoutStepSubject: BehaviorSubject<CheckoutStep>;
  currentEvent$: BehaviorSubject<IEvent>;
  orderSummary$: BehaviorSubject<ISummaryItem[]>;
  isLoader$: BehaviorSubject<Boolean>;

  constructor() {
    this.currentCheckoutStepSubject = new BehaviorSubject(CheckoutStep.TICKET_SELECTION);
    this.currentCheckoutStep$ = this.currentCheckoutStepSubject.asObservable();
    this.currentEvent$ = new BehaviorSubject(null);
    this.isLoader$ = new BehaviorSubject(false);
    this.orderSummary$ = new BehaviorSubject([]);
  }

  setStep(step: CheckoutStep) {
    this.currentCheckoutStepSubject.next(step);
  }

  setCurrentEvent(event: IEvent) {
    this.currentEvent$.next(event);
  }

  setLoaderState(val: boolean) {
    this.isLoader$.next(val);
  }

  setOrderSummary(summary: ISummaryItem[]) {
    this.orderSummary$.next(summary);
  }
}
