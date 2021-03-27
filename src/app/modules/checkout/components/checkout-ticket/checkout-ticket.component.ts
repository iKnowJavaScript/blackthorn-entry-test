import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { IEvent, TimeTypeEnum, CheckoutStep, ISummaryItem, EventEnum } from 'src/app/shared/models/event-interface';
import { CheckoutService } from '../../services/checkout.service';

@Component({
  selector: 'app-checkout-ticket',
  templateUrl: './checkout-ticket.component.html',
  styleUrls: ['./checkout-ticket.component.scss'],
})
export class CheckoutTicketComponent implements OnInit {
  allCheckoutStep = CheckoutStep;
  ticketType = EventEnum;
  form: FormGroup;
  subscription = new Subscription();

  constructor(
    private fb: FormBuilder,
    private checkoutService: CheckoutService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.initForm();
  }

  initForm() {
    this.form = this.fb.group({
      tickets: new FormArray([]),
    });

    this.getCurrentEvent.tickets.forEach((ticket) => {
      let prefillValue;
      const order = this.getOrderSummary.find((order) => order.ticketId == ticket.id);

      if (ticket.type === this.ticketType.DONATION) {
        prefillValue = (order && order.price) || '';
        if (prefillValue && ticket.options.includes(prefillValue)) prefillValue = '';
        this.getTicketForm.push(this.fb.group({ price: this.fb.control(prefillValue) }));
      } else {
        prefillValue = (order && order.requestQuantity) || 0;
        this.getTicketForm.push(this.fb.group({ quantity: this.fb.control(prefillValue) }));
      }
    });
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

  setOrderSummary(summary: ISummaryItem[]) {
    this.checkoutService.setOrderSummary(summary);
  }

  get formControls() {
    return this.form.controls;
  }

  get getTicketForm() {
    return this.formControls.tickets as FormArray;
  }

  getType(time: { value: number; type: TimeTypeEnum }): string {
    switch (time.type) {
      case TimeTypeEnum.MINUTE:
        return `minute${time.value > 1 ? 's' : ''}`;
      case TimeTypeEnum.HOUR:
        return `hour${time.value > 1 ? 's' : ''}`;
      case TimeTypeEnum.DAY:
        return `day${time.value > 1 ? 's' : ''}`;
      default:
        time.type;
    }
  }

  inputOnchange(event: Event, ticketId: string) {
    //@ts-ignore
    const value: string = event.target.value;
    this.handleQuantityChange(+value, ticketId, true);
  }

  selectionChange(event: Event, ticketId: string) {
    //@ts-ignore
    const value: string = event.target.value;
    this.handleQuantityChange(+value, ticketId, false);
  }

  removeTicketFromSummary(ticketId: string) {
    const updatedOrderSummary = this.getOrderSummary.filter((order) => order.ticketId !== ticketId);
    this.setOrderSummary(updatedOrderSummary);
  }

  handleQuantityChange(value: number, ticketId: string, isDonation: boolean) {
    if (value == 0 || !value) {
      this.removeTicketFromSummary(ticketId);
      return;
    }
    let { title, price, id } = this.getCurrentEvent.tickets.find((ticket) => ticket.id === ticketId);

    if (isDonation) {
      price = value;
      value = 1;
    }

    let newOrder = {
      title,
      price,
      ticketId: id,
      requestQuantity: value,
      availableQuantity: value,
      waitlistQuantity: 0,
      isWaitList: false,
    };

    const index = this.getOrderSummary.findIndex((order) => order.ticketId === ticketId);

    if (index == -1) {
      this.setOrderSummary([...this.getOrderSummary, newOrder]);
    } else {
      const updatedOrderSummary = this.getOrderSummary.map((order) => {
        if (order.ticketId === ticketId) {
          return newOrder;
        }
        return order;
      });

      this.setOrderSummary(updatedOrderSummary);
    }
  }

  removeWishlist(ticketId: string) {
    const orderSummary = this.getOrderSummary.map((order) => {
      if (order.ticketId == ticketId) {
        order.requestQuantity = order.requestQuantity - order.waitlistQuantity;
        order.waitlistQuantity = 0;
        order.isWaitList = false;
        return order;
      }
      return order;
    });
    this.setOrderSummary(orderSummary);
  }

  getTicketSummary(ticketId: string): ISummaryItem {
    return this.getOrderSummary.find((order) => order.ticketId == ticketId) || ({} as any);
  }

  validate(): void {
    const orderSummary = this.getOrderSummary.map((order) => {
      const ticket = this.getCurrentEvent.tickets.find((ticket) => ticket.id === order.ticketId);
      if (ticket.type !== this.ticketType.DONATION && ticket.type !== this.ticketType.SALES && ticket.validation) {
        if (ticket.validation.available == 0) {
          order.waitlistQuantity = order.requestQuantity;
          order.isWaitList = true;
          return order;
        }

        if (ticket.validation.available < order.requestQuantity) {
          order.availableQuantity = ticket.validation.available;
          return order;
        }
        return order;
      }
      order.availableQuantity = order.requestQuantity;
      return order;
    });

    this.checkoutService.setOrderSummary(orderSummary);
    this.router.navigate(['../checkout-form'], { relativeTo: this.route });
  }
}
