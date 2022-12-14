import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { EtudiantsComponent } from './etudiants.component';

const routes: Routes = [
  {
    path: '',
    component: EtudiantsComponent,
    data: {
      title: $localize`Etudiants`,
    },
    pathMatch: 'full',
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class EtudiantsRoutingModule {}
