import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import {
  IEvent,
  EventEnum,
  TimeTypeEnum,
  ISummaryItem,
  CheckoutStep,
} from 'src/app/shared/model/event-interface';
import { CheckoutFormComponent } from '../checkout-form/checkout-form.component';
import { CheckoutTicketComponent } from '../checkout-ticket/checkout-ticket.component';
import { data } from './data';

@Component({
  selector: 'app-event-container',
  templateUrl: './event-container.component.html',
  styleUrls: ['./event-container.component.scss'],
})
export class EventContainerComponent implements OnInit {
  constructor() {}
  events = data.events;
  currentEvent: IEvent = data.events[0];
  ticketType = EventEnum;
  currentCurrency = 'USD';
  orderSummary: ISummaryItem[] = [];
  allCheckoutStep = CheckoutStep;
  currentCheckoutStep: CheckoutStep = CheckoutStep.LIST_EVENT;
  taxRate = 4.1345;
  isTicketFormvalid = false;
  showLoader = false
  @ViewChild('checkoutTicket', { static: false }) checkoutTicket: CheckoutTicketComponent;
  @ViewChild('checkoutForm', { static: false }) checkoutForm: CheckoutFormComponent;

  ngOnInit(): void {
    if (this.currentEvent && this.currentEvent.currency) {
      this.currentCurrency = this.currentEvent.currency;
    }
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

  handleQuantityChange({value, ticketId, isDonation}:{value: number, ticketId: string, isDonation: boolean}) {
    if (value == 0 || !value) {
      this.removeTicketFromSummary(ticketId);
      return;
    }
    let { title, price, id } = this.currentEvent.tickets.find(
      (ticket) => ticket.id === ticketId
    );

    if (isDonation) {
      price = value;
      value = 1;
    }

    let newOrder;
    if(this.currentCheckoutStep === this.allCheckoutStep.SELECTION){
      newOrder = { title, price, ticketId: id, requestQuantity: value, availableQuantity: 0, waitlistQuantity: 0 , isWaitList: false }
    }else{
      newOrder = { title, price, ticketId: id, requestQuantity: value, availableQuantity: value, waitlistQuantity: 0, isWaitList: false  };
    }
    

    const index = this.orderSummary.findIndex(
      (order) => order.ticketId === ticketId
    );

    if (index == -1) {
      this.orderSummary.push(newOrder);
    } else {
      this.orderSummary = this.orderSummary.map((order) => {
        if (order.ticketId === ticketId) {
          return newOrder;
        }
        return order;
      });
    }
  }

  removeTicketFromSummary(ticketId: string) {
    this.orderSummary = this.orderSummary.filter(
      (order) => order.ticketId !== ticketId
    );
  }

  getOrderTotal(){
    return this.orderSummary.reduce((summary, order)=> {
      if(this.currentCheckoutStep === this.allCheckoutStep.SELECTION){
        return summary += order.requestQuantity * order.price
      }

      const waitlistTotal = !order.isWaitList ? 0 : order.waitlistQuantity * order.price;
      const availableTotal = order.availableQuantity * order.price
      return summary += (waitlistTotal + availableTotal);
    },0)
  }

  getOrderTax(){
     const total = this.getOrderTotal();
     if(total === 0) return 0;
     return total / 100 * this.taxRate
  }

  getGrandTotal(){
    return this.getOrderTotal() + this.getOrderTax()
  }

  removeWishlist({ticketId}:{ticketId: string}){
    this.orderSummary = this.orderSummary.map((order)=>{
      if(order.ticketId == ticketId){
        order.requestQuantity = order.requestQuantity  - order.waitlistQuantity;
        order.waitlistQuantity = 0;
        order.isWaitList = false;
        return order
      }
      return order
    })
  }

  gotoNextStep() {
    switch (this.currentCheckoutStep) {
      case CheckoutStep.SELECTION:
        //performfalidation
        this.orderSummary = this.checkoutTicket.validateSelection();
        this.currentCheckoutStep = CheckoutStep.VALIDATION;
        break;

      case CheckoutStep.VALIDATION:
        this.showLoader = true;
        setTimeout(() => {
          this.showLoader = false;
          this.currentCheckoutStep = CheckoutStep.INFORMATION;
        }, 1000);
        break;

      default:
        break;
    }
  }

  handleInformationFormState(value: boolean){
    this.isTicketFormvalid = value
  }

  validateForm(){
    this.checkoutForm.onSubmit()
  }

  handleEventChange(eventId){
    this.currentEvent = this.events.find((event)=> event.id == eventId);
    this.currentCurrency = this.currentEvent && this.currentEvent.currency;
    this.currentCheckoutStep = CheckoutStep.SELECTION;
  }

  handleTopNavigation(){
    if(this.currentCheckoutStep == this.allCheckoutStep.INFORMATION){
      this.currentCheckoutStep = this.allCheckoutStep.VALIDATION;
    }

    if(this.currentCheckoutStep == this.allCheckoutStep.SELECTION){
      this.currentCheckoutStep = this.allCheckoutStep.LIST_EVENT;
    }
  }
}
