import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

import { CurrentUserService } from '../services/current-user.service';
import { ScoreService } from '../services/score.service';
import { Score } from '../models/score';
import { ScoresResponse } from '../models/scores-response';
import { MatTableDataSource } from '@angular/material/table';

@Component({
  selector: 'app-score',
  templateUrl: './score.component.html',
  styleUrls: ['./score.component.scss']
})
export class ScoreComponent implements OnInit {

  displayedColumns: string[] = ['id', 'name', 'percent'];
  dataSource = new MatTableDataSource<Score>();
  
  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private currentUserService: CurrentUserService,
    private scoreService: ScoreService,
  ) { }

  ngOnInit(): void {
    let data: ScoresResponse = this.route.snapshot.data['scoresResponse'];

    this.dataSource.data = data.content.scores;
    console.log(data.content.scores);
  }


  logout() {
    this.currentUserService.logout();
    this.router.navigate(['']);
  }

  test() {    
    this.router.navigate(['screen']);
  }
}
