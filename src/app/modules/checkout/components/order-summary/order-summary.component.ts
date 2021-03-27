import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ISummaryItem } from 'src/app/shared/models/event-interface';

@Component({
  selector: 'app-order-summary',
  templateUrl: './order-summary.component.html',
  styleUrls: ['./order-summary.component.scss'],
})
export class OrderSummaryComponent implements OnInit {
  @Input() orderSummary: ISummaryItem[];
  @Input() submitText: string;
  @Input() isFormValid: Boolean;
  @Input() currentCurrency: string;
  @Output() triggerValidation = new EventEmitter<any>();

  taxRate = 4.1345;

  constructor() {}

  getOrderTotal() {
    return this.orderSummary.reduce((summary, order) => {
      const waitlistTotal = !order.isWaitList ? 0 : order.waitlistQuantity * order.price;
      const availableTotal = order.availableQuantity * order.price;
      return (summary += waitlistTotal + availableTotal);
    }, 0);
  }

  getOrderTax() {
    const total = this.getOrderTotal();
    if (total === 0) return 0;
    return (total / 100) * this.taxRate;
  }

  getGrandTotal() {
    return this.getOrderTotal() + this.getOrderTax();
  }

  ngOnInit(): void {}
}
