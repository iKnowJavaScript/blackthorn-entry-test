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
