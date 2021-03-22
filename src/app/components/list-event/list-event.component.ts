import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import {IEvent} from 'src/app/shared/model/event-interface';

@Component({
  selector: 'app-list-event',
  templateUrl: './list-event.component.html',
  styleUrls: ['./list-event.component.scss'],
})
export class ListEventComponent {
  constructor() {}
  @Input() events: IEvent[];
  @Output() handleEventChange = new EventEmitter<any>();
  showLoader = false;

  handleSelection(id){
    this.showLoader = true;
    setTimeout(() => {
      this.handleEventChange.emit(id);
      this.showLoader = false;
    }, 100);
  }

}
