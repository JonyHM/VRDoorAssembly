import { Routes, RouterModule } from '@angular/router';
import { ScoreComponent } from './score.component';
import { NgModule } from '@angular/core';
import { ScoreResolver } from './score.resolver';

const routes: Routes = [
  {
    path: '',
    component: ScoreComponent,
    resolve: { scoresResponse: ScoreResolver }
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ScoreRoutingModule { }