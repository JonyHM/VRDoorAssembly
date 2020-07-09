import { Component, OnInit, ViewChild } from '@angular/core';
import { CurrentUserService } from '../services/current-user.service';
import { CurrentUser } from '../models/current-user';
import { Router } from '@angular/router';
import { ScoreService } from '../services/score.service';
import { Score } from '../models/score';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-screen',
  templateUrl: './screen.component.html',
  styleUrls: ['./screen.component.scss']
})
export class ScreenComponent implements OnInit {
  
  counter: number;
  piece1: any;
  piece2: any;
  piece3: any;
  piece4: any;
  firstTableArray: Array<any>;
  rotateFirstLeft: any;
  rotateFirstRight: any;
  leftArrow: any;
  rightArrow: any;
  
  counter2: number;
  piece1_1: any;
  piece2_2: any;
  piece3_3: any;
  piece4_4: any;
  secondTableArray: Array<any>;

  lightAlert: any;
  alertTwo: any;
  totalScore: number;
  user: CurrentUser;
  
  constructor(
    private router: Router,
    private currentUserService: CurrentUserService,
    private scoreService: ScoreService,
    private _snackBar: MatSnackBar
  ) { 
    this.counter = 0;
    this.counter2 = 0;
    this.totalScore = 0;
  }

  ngOnInit(): void {
    this.checkMobile();
    this.bindElements();
    this.setEvents();
  }

  score() {
    this.router.navigate(['score']);
  }

  checkMobile() {
    this.currentUserService.getUser()
      .subscribe(user => {
        this.user = user;        
      }
    );

    if (!AFRAME.utils.device.isMobile()) {
      var el = document.querySelector("#mycursor");
      el.setAttribute('cursor', 'rayOrigin: mouse;fuse: false');
    } else {
      var el = document.querySelector("#mycursor");
      el.setAttribute('cursor', 'rayOrigin: cursor;fuse: true');
      el.object3D.visible = true;
    }
  }

  bindElements() {
    this.piece1 = document.querySelector("#peca1");
    this.piece2 = document.querySelector("#peca2");
    this.piece3 = document.querySelector("#peca3");
    this.piece4 = document.querySelector("#peca4");
    this.firstTableArray = [this.piece1, this.piece2, this.piece3, this.piece4]; 
    
    this.piece1_1 = document.querySelector("#peca1_1");
    this.piece2_2 = document.querySelector("#peca2_2");
    this.piece3_3 = document.querySelector("#peca3_3");
    this.piece4_4 = document.querySelector("#peca4_4");
    this.secondTableArray = [this.piece1_1, this.piece2_2, this.piece3_3, this.piece4_4];

    this.rotateFirstLeft = document.querySelector("#setaEsquerda");
    this.rotateFirstRight = document.querySelector("#setaDireita");
    this.leftArrow = document.querySelector("#tras");
    this.rightArrow = document.querySelector("#frente");

    this.lightAlert = document.querySelector("#alerta-luz");
    this.alertTwo = document.querySelector("#alerta2");
  };

  //==============================================================================
  // First Table
  // Rotation
  leftRotateFirstTable() {
    this.firstTableArray.forEach(piece => {
      piece.object3D.rotation.y -= 0.9;
    });

    this.rotateFirstLeft.setAttribute('animation', 'property: position; dur: 1200; from: 0 0.1 0; to: 0 0.1 -0.1;loop: false;');
    this.rotateFirstLeft.setAttribute('animation', 'property: position; dur: 1000; from: 0 0.1 -0.1; to: 0 0.1 0;loop: false;easing: easeOutQuart;elasticity:5;');
  }

  rightRotateFirstTable() {
    this.firstTableArray.forEach(piece => {
      piece.object3D.rotation.y += 0.9;
    });

    this.rotateFirstRight.setAttribute('animation', 'property: position; dur: 1200; from: 0 0.1 0; to: 0 0.1 -0.1;loop: false;');
    this.rotateFirstRight.setAttribute('animation', 'property: position; dur: 1000; from: 0 0.1 -0.1; to: 0 0.1 0;loop: false;easing: easeOutQuart;elasticity:5;');
  }

  // Stepper
  nextPiece() {
    this.counter ++; 

    switch (this.counter) { 
      case 1:
        this.piece2.setAttribute('animation', 'property: position; dur: 2000; from: 0.6 0 1; to: 0 0 0 ;loop: false;');
        this.piece2.object3D.visible = true;

        var el = document.querySelector("#image1");
        el.object3D.visible = false;

        var el = document.querySelector("#image2");
        el.setAttribute('visible', true)
        break;
    
      case 2:
        this.piece3.setAttribute('animation', 'property: position; dur: 2000; from: 0.6 0 1; to: 0 0 0 ;loop: false;');
        this.piece3.object3D.visible = true;
        break;

      case 3:
        this.piece4.setAttribute('animation', 'property: position; dur: 2000; from: 0.6 0 1; to: 0 0 0 ;loop: false;');
        this.piece4.object3D.visible = true;
        break;

      default:
        this.counter = 3;
        break;
    }
  }

  previousPiece() {
    this.counter --;
    
    switch (this.counter) {
      case 0:
        this.piece2.setAttribute('animation', 'property: position; dur: 2000; from: 0.6 0 1; to: 0.6 0 1;loop: false;');
        this.piece2.object3D.visible = false;

        var el = document.querySelector("#image2");
        el.setAttribute('visible', false)

        var el = document.querySelector("#image1");
        el.object3D.visible = true;
        break;
    
      case 1:
        this.piece3.object3D.visible = false;
        this.piece3.setAttribute('animation', 'property: position; dur: 2000; from: 0.6 0 1; to: 0.6 0 1;loop: false;');
        break;

      case 2:
        this.piece4.object3D.visible = false;
        this.piece4.setAttribute('animation', 'property: position; dur: 2000; from: 0.6 0 1; to: 0.6 0 1;loop: false;');
        break;

      default:
        this.counter = 0;
        break;
    }
  }

  //==============================================================================
  // Second table
  // Rotation
  leftRotateSecondTable() {
    this.secondTableArray.forEach(piece => {
      piece.object3D.rotation.y -= 0.9;
    });

    this.rotateFirstLeft.setAttribute('animation', 'property: position; dur: 1200; from: 0 0.1 0; to: 0 0.1 -0.1;loop: false;');
    this.rotateFirstLeft.setAttribute('animation', 'property: position; dur: 1000; from: 0 0.1 -0.1; to: 0 0.1 0;loop: false;easing: easeOutQuart;elasticity:5;');
  }

  rightRotateSecondTable() {    
    this.secondTableArray.forEach(piece => {
      piece.object3D.rotation.y += 0.9;
    });

    this.rotateFirstRight.setAttribute('animation', 'property: position; dur: 1200; from: 0 0.1 0; to: 0 0.1 -0.1;loop: false;');
    this.rotateFirstRight.setAttribute('animation', 'property: position; dur: 1000; from: 0 0.1 -0.1; to: 0 0.1 0;loop: false;easing: easeOutQuart;elasticity:5;');
  }

  didClickFirstImage() {  
    if (this.counter2 == 0) {
      var el = this.secondTableArray[this.counter2];
      el.object3D.visible = true;
      this.counter2++;
      this.totalScore++;
    } else {
      setTimeout(() => {
        this.hideAll();
        this.sendScore(this.totalScore);
      }, 500);
    }
  }

  didClickSecondImage() {
    if (this.counter2 == 1) {
      var el = this.secondTableArray[this.counter2];
      el.object3D.visible = true;
      this.counter2++;
      this.totalScore++;
    } else {
      setTimeout(() => {
        this.hideAll();
        this.sendScore(this.totalScore);
      }, 500);
    }
  }

  didClickThirdImage() {
    if (this.counter2 == 2) {
      var el = this.secondTableArray[this.counter2];
      el.object3D.visible = true;
      this.counter2++;
      this.totalScore++;
    } else {
      setTimeout(() => {
        this.hideAll();
        this.sendScore(this.totalScore);
      }, 500);
    }
  }

  didClickFourthtImage() {
    if (this.counter2 == 3) {
      var el = this.secondTableArray[this.counter2];
      el.object3D.visible = true;
    
      this.totalScore++;
      this.showAlert();      
      this.rotateAll();

      setTimeout(() => {
        this.hideAlert();
        this.counter2 = 0;
        this.stopAll();
        this.sendScore(this.totalScore);
      }, 4800);

    } else {
      setTimeout(() => {
        this.hideAll();
        this.sendScore(this.totalScore);
      }, 500);
    }
  }

  private stopAll() {
    this.secondTableArray.forEach(el => {
      el.object3D.visible = false;
      el.setAttribute('animation', 'property: rotation; dur: 1000; to:0 0 0 ;loop: false;');
    });
  }

  private rotateAll() {
    this.secondTableArray.forEach(el => {
      el.setAttribute('animation', 'property: rotation; dur: 1000; to:0 360 0 ;loop: 1;');
    });
  }

  private showAlert() {
    this.lightAlert.object3D.visible = true;

    this.alertTwo.setAttribute('material', 'color', 'green');
    setTimeout(() => {
      this.alertTwo.object3D.visible = true;
      this.lightAlert.setAttribute('animation', 'property: model-opacity; dur: 1000; to: 1 ;loop: 3;');
    }, 100);
  }

  private hideAlert() {
    this.lightAlert.object3D.visible = false;
    this.lightAlert.setAttribute('animation', 'property: model-opacity; dur: 1000; to: 0 ;loop: false;');
    this.alertTwo.object3D.visible = false;
  }

  private hideAll() {
    this.counter2 = 0;
    this.secondTableArray.forEach(piece => {
      piece.object3D.visible = false;
    });

    this.lightAlert.object3D.visible = true;
    this.lightAlert.setAttribute('animation', 'property: model-opacity; dur: 1000; to: 1 ;loop: 3;');

    this.alertTwo.object3D.visible = true;
    this.alertTwo.setAttribute('material', 'color', 'red');

    setTimeout(() => {
      this.hideAlert();
    }, 2000);
  }

  //==============================================================================
  private setEvents() {
    console.log('set events');
  
    document.querySelector('a-scene').addEventListener('enter-vr', function () {
      console.log("MODO VR");
  
      var el = document.querySelector("#mycursor");
      el.setAttribute('cursor', 'rayOrigin: cursor; fuse: true;');
      el.object3D.visible = true;
  
      var el = document.querySelector("#CameraPosition");
      el.object3D.position.set(0, 0, 3.5);
  
      var el = document.querySelector("#piso_1");
      el.object3D.visible = true;
  
      var el = document.querySelector("#piso_11");
      el.object3D.visible = true;
  
      var el = document.querySelector("#piso0");
      el.object3D.visible = true;
  
      var el = document.querySelector("#piso01");
      el.object3D.visible = true;
  
      var el = document.querySelector("#piso1");
      el.object3D.visible = true;
  
      var el = document.querySelector("#piso11");
      el.object3D.visible = true;
  
      var el = document.querySelector("#piso2");
      el.object3D.visible = true;
  
      var el = document.querySelector("#piso21");
      el.object3D.visible = true;
  
      var el = document.querySelector("#pisoImagem1");
      el.object3D.visible = true;
  
      var el = document.querySelector("#pisoImagem2");
      el.object3D.visible = true;
  
      var el = document.querySelector("#pisoImagem3");
      el.object3D.visible = true;
  
      var el = document.querySelector("#pisoImagem4");
      el.object3D.visible = true;
  
      var el = document.querySelector("#piso_luz1");
      el.object3D.visible = true;
    });
  }

  didClickAtPiso02() {
    var el = document.querySelector("#CameraPosition");
    el.object3D.position.set(10, 0, 3.5);
  }

  didClickAtPiso01() {
    var el = document.querySelector("#CameraPosition");
    el.object3D.position.set(5, 0, 3.5);
  }

  didClickAtPiso0() {
    var el = document.querySelector("#CameraPosition");
    el.object3D.position.set(0, 0, 3.5);
  }

  didClickAtPiso1() {
    var el = document.querySelector("#CameraPosition");
    el.object3D.position.set(-5, 0, 3.5);
  }

  private sendScore(score: number) {
    var total = (score / 4) * 100;
    console.log(total);

    var finalScore: Score = {
      userId: this.user.id,
      name: this.user.name,
      percent: total
    };
    this.scoreService.postScore(finalScore)
      .subscribe( 
        response => {
          console.log(response.body);
          this.openSnackBar(response.body.message, '', 'action-ok');
        },
        err => {
          this.openSnackBar(err.message, '', 'action-error');
        }
      );

    this.totalScore = 0;
  }

  private openSnackBar(message: string, action: string, cssClass: string) {
    this._snackBar.open(message, action, {
      duration: 2000,
      verticalPosition: 'top',
      horizontalPosition: 'center',
      panelClass: [cssClass]
    });
  }
}
