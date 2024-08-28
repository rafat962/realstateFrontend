import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HeroComponent } from './hero/hero.component';
import { All_flatsComponent } from './all_flats/all_flats.component';
import { One_flatComponent } from './one_flat/one_flat.component';

export const routes: Routes = [
  { path: '', component: HeroComponent },
  {
    path: 'auth',
    loadChildren: () =>
      import('./auth/authrouts.routing').then((mod) => mod.routes),
  },
  { path:'flats' , component:All_flatsComponent },
  { path:'oneFlat/:id', component:One_flatComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRouting {}
