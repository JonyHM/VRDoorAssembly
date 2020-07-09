import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginGuard } from './guard/login.guard';


const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    redirectTo: 'login'
  },
  {
    path: 'screen',
    loadChildren: './screen/screen.module#ScreenModule'
  },
  {
    path: 'login',
    loadChildren: './login/login.module#LoginModule'
  },
  {
    path: 'score',
    loadChildren: './score/score.module#ScoreModule'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
