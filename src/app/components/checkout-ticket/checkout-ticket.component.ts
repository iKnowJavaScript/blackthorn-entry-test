import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import {
  IEvent,
  TimeTypeEnum,
  CheckoutStep,
  ISummaryItem,
  EventEnum,
} from 'src/app/shared/model/event-interface';

@Component({
  selector: 'app-checkout-ticket',
  templateUrl: './checkout-ticket.component.html',
  styleUrls: ['./checkout-ticket.component.scss'],
})
export class CheckoutTicketComponent implements OnInit {
  constructor() {}
  @Input() currentEvent: IEvent;
  @Input() currentCurrency = 'USD';
  @Output() handleQuantityChange = new EventEmitter<any>()
  @Output() removeWishlist = new EventEmitter<any>()
  @Input() currentCheckoutStep: CheckoutStep
  @Input() orderSummary: ISummaryItem[];
  
  allCheckoutStep = CheckoutStep;
  ticketType = EventEnum;
  showLoader = false

  ngOnInit(): void {
   
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

  selectionChange(event: Event, ticketId: string) {
    //@ts-ignore
    const value: string = event.target.value;
    this.handleQuantityChange.emit({value:+value, ticketId, isDonation: false});
  }

  inputOnchange(event: Event, ticketId: string) {
    //@ts-ignore
    const value: string = event.target.value;
    this.handleQuantityChange.emit({value:+value, ticketId, isDonation:true});
  }

  validateSelection(): ISummaryItem[]{
    this.showLoader = true;

    setTimeout(() => {
      this.showLoader = false
    }, 1000);

    return this.orderSummary.map((order)=> {
      const ticket = this.currentEvent.tickets.find((ticket)=> ticket.id === order.ticketId);
      if(ticket.type !== this.ticketType.DONATION && ticket.type !== this.ticketType.SALES && ticket.validation){
        if(ticket.validation.available == 0){
          order.waitlistQuantity = order.requestQuantity;
          order.isWaitList = true;
          return order
        }

        if(ticket.validation.available < order.requestQuantity){
          order.availableQuantity = ticket.validation.available;
          // order.waitlistQuantity = order.requestQuantity - order.availableQuantity;
          // order.isWaitList = true;
          return order
        }
        return order
      }
      order.availableQuantity = order.requestQuantity;
      return order
    })
  }

  getTicketSummary(ticketId: string): ISummaryItem{
    return this.orderSummary.find((order)=> order.ticketId == ticketId) || {} as any
  }
}
