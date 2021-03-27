import { Routes, RouterModule, PreloadAllModules } from '@angular/router';
import { NgModule } from '@angular/core';
import { ListEventComponent } from './components/list-event/list-event.component';

const routes: Routes = [
  {
    path: '',
    children: [
      { path: '', redirectTo: '/events', pathMatch: 'full' },
      { path: 'events', component: ListEventComponent },
      {
        path: 'event/:id',
        loadChildren: () => import('src/app/modules/checkout/checkout.module').then((module) => module.CheckoutModule),
      },
      { path: '**', redirectTo: '/events' },
    ],
  },
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
