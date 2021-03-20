import { Routes, RouterModule, PreloadAllModules, ExtraOptions } from '@angular/router';
import { NgModule } from '@angular/core';

const routes: Routes = [
  {
    path:'',
    // children:[
    //   { path: '', redirectTo: '/summary', pathMatch: 'full' },
    //   { path: 'summary', component:  },

    //   { path: '**', redirectTo: '/summary' },
    // ]
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
