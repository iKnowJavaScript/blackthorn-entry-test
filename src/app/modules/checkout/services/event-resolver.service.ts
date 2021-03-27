import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from '@angular/router';

import { IEvent } from 'src/app/shared/models/event-interface';
import { EventService } from '../../../shared/service/event.service';

@Injectable({
  providedIn: 'root'
})
export class EventResolverService implements Resolve<Promise<IEvent>> {

  constructor(private eventService: EventService){}

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot){
    const id = route.paramMap.get('id');
    return this.eventService.getEventById(id)
  }
  
}