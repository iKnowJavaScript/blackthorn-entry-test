import { Injectable } from '@angular/core';
import { EVENTS } from 'src/app/shared/mock/event-mock';
import { IEvent } from '../models/event-interface';

@Injectable({
  providedIn: 'root'
})
export class EventService {
  getAllEvents(): Promise<IEvent[]> {
    return Promise.resolve(EVENTS.events);
  }

  getEventById(id:string):Promise<IEvent> {
    return Promise.resolve(EVENTS.events.find((event)=> event.id === id))
  }
}