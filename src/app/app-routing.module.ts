import { Routes, RouterModule, PreloadAllModules, ExtraOptions } from '@angular/router';
import { NgModule } from '@angular/core';
import { EventContainerComponent } from './components/event-container/event-container.component';

const routes: Routes = [
  {
    path:'',
    children:[
      { path: '', redirectTo: '/event', pathMatch: 'full' },
      { path: 'event', component: EventContainerComponent },

      { path: '**', redirectTo: '/event' },
    ]
  }

];


@NgModule({
  imports: [
    RouterModule.forRoot(routes, {
      preloadingStrategy: PreloadAllModules,
      useHash: true,
    }),
  ],
  exports: [RouterModule],
})
export class AppRoutingModule {}
