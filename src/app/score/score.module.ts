import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ScoreComponent } from './score.component';
import { SharedModule } from '../shared/shared.module';
import { ScoreRoutingModule } from './score-routing.module';
import { ScoreResolver } from './score.resolver';



@NgModule({
  declarations: [ScoreComponent],
  imports: [
    CommonModule,
    SharedModule,
    ScoreRoutingModule
  ],
  providers: [
    ScoreResolver
  ]
})
export class ScoreModule { }
