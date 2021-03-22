import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { IEvent } from 'src/app/shared/model/event-interface';

@Component({
  selector: 'app-checkout-form',
  templateUrl: './checkout-form.component.html',
  styleUrls: ['./checkout-form.component.scss'],
})
export class CheckoutFormComponent implements OnInit {
  constructor() {}
  @Input() currentEvent: IEvent;
  @Output() isFormValid = new EventEmitter<boolean>();

  showLoader = false;

  ngOnInit(): void {}
}
