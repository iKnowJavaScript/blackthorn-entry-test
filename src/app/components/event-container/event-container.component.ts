import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { title } from 'process';
import {
  IEvent,
  EventEnum,
  TimeTypeEnum,
  ISummaryItem,
  CheckoutStep,
} from 'src/app/shared/model/event-interface';
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
  currentCheckoutStep: CheckoutStep = CheckoutStep.INFORMATION;
  taxRate = 4.1345;
  @ViewChild('checkoutTicket', { static: false }) checkoutTicket: CheckoutTicketComponent;


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
        setTimeout(() => {
          this.currentCheckoutStep = CheckoutStep.INFORMATION;
        }, 200);
        break;

      default:
        break;
    }
  }
}
