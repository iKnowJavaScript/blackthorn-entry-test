import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';
import { IEvent } from 'src/app/shared/models/event-interface';
import { EventService } from 'src/app/shared/service/event.service';

@Component({
  selector: 'app-list-event',
  templateUrl: './list-event.component.html',
  styleUrls: ['./list-event.component.scss'],
})
export class ListEventComponent implements OnInit {
  constructor(private eventServie: EventService, private router: Router) {}
  eventsList: IEvent[] = [];

  async ngOnInit() {
    this.eventsList = await this.eventServie.getAllEvents();
  }

  gotoEventPage(id) {
    this.router.navigate(['/event', id]);
  }

  handleSelection(id) {
    this.gotoEventPage(id);
  }
}
