import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';

import { Score } from '../models/score';
import { environment } from 'src/environments/environment';
import { DefaultResponse } from '../models/default-response';
import { ScoresResponse } from '../models/scores-response';

const API = environment.URL;

@Injectable({
  providedIn: 'root'
})
export class ScoreService {

  constructor(
    private http: HttpClient
  ) { }

  public postScore(score: Score): Observable<HttpResponse<DefaultResponse>> {
    return this.http.post<DefaultResponse>(API + '/score', score, { observe: 'response' });
  }

  public getScores(): Observable<ScoresResponse> {    
    return this.http.get<ScoresResponse>(API + '/score');
  }
}