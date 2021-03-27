import { Component, EventEmitter, Input, OnDestroy, OnInit, Output } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Subscription } from 'rxjs';
import { EventEnum, IEvent, ISummaryItem } from 'src/app/shared/models/event-interface';
import { CheckoutService } from '../../services/checkout.service';

@Component({
  selector: 'app-checkout-form',
  templateUrl: './checkout-form.component.html',
  styleUrls: ['./checkout-form.component.scss'],
})
export class CheckoutFormComponent implements OnInit, OnDestroy {
  form: FormGroup;
  subscription = new Subscription();
  formHeading = {};
  
  constructor(private fb: FormBuilder, private checkoutService: CheckoutService) {}
  
  ngOnInit(): void {
    this.initForm();
  }

  get getCurrentEvent(): IEvent {
    return this.checkoutService.currentEvent$.value;
  }

  set setCurrentEvent(value: IEvent) {
    this.checkoutService.setCurrentEvent(value);
  }

  get getOrderSummary(): ISummaryItem[] {
    return this.checkoutService.orderSummary$.value;
  }

  get formControls() {
    return this.form.controls;
  }

  get getFreeTicketForm() {
    return this.formControls.free as FormArray;
  }

  get getOtherTicketForm() {
    return this.formControls.other as FormArray;
  }

  createFreeTicket() {
    return this.fb.group({
      firstName: this.fb.control('', [Validators.required]),
      lastName: this.fb.control('', [Validators.required]),
      email: this.fb.control('', [Validators.required, Validators.email]),
      newsLetter: this.fb.control('YES'),
    });
  }

  createMainTicket() {
    return this.fb.group({
      firstName: this.fb.control('', [Validators.required]),
      lastName: this.fb.control('', [Validators.required]),
      email: this.fb.control('', [Validators.required, Validators.email]),
      job: this.fb.control(''),
      company: this.fb.control(''),
      country: this.fb.control('', [Validators.required]),
    });
  }

  initForm() {
    this.form = this.fb.group({
      free: new FormArray([]),
      other: new FormArray([]),
    });

    let freeIndexCounter = 0;
    let otherIndexCounter = 0;

    this.getOrderSummary.forEach((order) => {
      const ticket = this.getCurrentEvent.tickets.find((ticket) => ticket.id == order.ticketId);

      if (ticket.type === EventEnum.BOOKING) {
        if (!order.price) {
          //free ticket
          const orderCount = order.availableQuantity + order.waitlistQuantity || 0;
          for (let index = 0; index < orderCount; index++) {
            this.formHeading[`${freeIndexCounter}__free`] = { title: order.title, attendee: index + 1 };
            this.getFreeTicketForm.push(this.createFreeTicket());
            freeIndexCounter += 1;
          }
        } else {
          const orderCount = order.availableQuantity + order.waitlistQuantity || 0;
          for (let index = 0; index < orderCount; index++) {
            this.formHeading[`${otherIndexCounter}__other`] = { title: order.title, attendee: index + 1 };
            this.getOtherTicketForm.push(this.createMainTicket());
            otherIndexCounter += 1;
          }
        }
      }
    });
  }

  validateAllFormFields(formGroup: FormGroup) {
    Object.keys(formGroup.controls).forEach((field) => {
      const control = formGroup.get(field);
      if (control instanceof FormControl) {
        control.markAsTouched({ onlySelf: true });
      } else if (control instanceof FormGroup) {
        this.validateAllFormFields(control);
      }
    });
  }

  onSubmit() {
    if (this.form.valid) {
      console.log(this.form.value);
    } else {
      this.validateAllFormFields(this.form);
    }
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}
