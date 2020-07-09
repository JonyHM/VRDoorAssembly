import { ScoreService } from '../services/score.service';
import { Injectable } from '@angular/core';
import { Resolve, RouterStateSnapshot, ActivatedRouteSnapshot } from '@angular/router';
import { Observable } from 'rxjs';
import { ScoresResponse } from '../models/scores-response';

@Injectable()
export class ScoreResolver implements Resolve<Observable<ScoresResponse>> {

    constructor(
      private scoreService: ScoreService
    ) { }

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<ScoresResponse> {
        return this.scoreService.getScores();
    }
}
