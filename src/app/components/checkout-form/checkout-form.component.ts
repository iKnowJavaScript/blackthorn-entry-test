import {
  Component,
  EventEmitter,
  Input,
  OnDestroy,
  OnInit,
  Output,
} from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Subscription } from 'rxjs';
import {
  EventEnum,
  IEvent,
  ISummaryItem,
} from 'src/app/shared/model/event-interface';

@Component({
  selector: 'app-checkout-form',
  templateUrl: './checkout-form.component.html',
  styleUrls: ['./checkout-form.component.scss'],
})
export class CheckoutFormComponent implements OnInit, OnDestroy {
  constructor(private fb: FormBuilder) { }
  @Input() currentEvent: IEvent;
  @Output() isFormValid = new EventEmitter<boolean>();
  @Input() orderSummary: ISummaryItem[];

  form: FormGroup;
  subscription = new Subscription();
  formHeading = {}

  showLoader = false;

  ngOnInit(): void {
    this.form = this.fb.group({
      free: new FormArray([]),
      other: new FormArray([]),
    });

    let freeIndexCounter = 0;
    let otherIndexCounter = 0;

    this.orderSummary.forEach((order) => {
      const ticket = this.currentEvent.tickets.find(
        (ticket) => ticket.id == order.ticketId
      );

      if (ticket.type === EventEnum.BOOKING) {
        if (!order.price) {
          //free ticket
          const orderCount = order.availableQuantity + order.waitlistQuantity || 0
          for (let index = 0; index < orderCount; index++) {
            this.formHeading[`${freeIndexCounter}__free`] = {title: order.title, attendee: freeIndexCounter + 1};
            this.getFreeTicketForm.push(this.createFreeTicket());
            freeIndexCounter += 1;
          }
        } else {
          const orderCount = order.availableQuantity + order.waitlistQuantity || 0
          for (let index = 0; index < orderCount; index++) {
            this.formHeading[`${otherIndexCounter}__other`] = {title: order.title, attendee: otherIndexCounter + 1};
            this.getOtherTicketForm.push(this.createMainTicket());
            otherIndexCounter += 1;
          }
        }
      }
    });

    this.subscription = this.form.valueChanges.subscribe(() => {
      this.isFormValid.emit(this.form.valid)
    }
    );
    this.isFormValid.emit(this.form.valid);
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

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  validateAllFormFields(formGroup: FormGroup) {
    Object.keys(formGroup.controls).forEach(field => {
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
}
