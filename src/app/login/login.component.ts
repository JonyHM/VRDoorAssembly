import { first } from 'rxjs/operators';
import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

import { LoginForm } from '../models/login.form';
import { AuthService } from '../services/auth.service';
import { CurrentUserService } from '../services/current-user.service';
import { DefaultResponse } from '../models/default-response';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  loginForm: FormGroup;
  form: LoginForm;
  role: string;

  constructor(
    private formBuilder: FormBuilder,
    private authService: AuthService,
    private router: Router,
    private _snackBar: MatSnackBar,
    private currentUserService: CurrentUserService
  ) { }

  ngOnInit() {
    window.localStorage.removeItem('auth');

    this.loginForm = this.formBuilder.group({
      username: ['', [Validators.required]],
      password: ['', [Validators.required]]
    });
  }

  login() {
    this.form = this.loginForm.getRawValue() as LoginForm;

    this.authService.authenticate(this.form)
      .pipe(first())
      .subscribe(
        response => {  
          this.currentUserService.setToken(response.body.content.accessToken);
          this.currentUserService.setRefreshToken(response.body.content.refreshToken);
          this.currentUserService.updateUser();
          this.router.navigate(['screen']);
        },
        () => {
          this.openSnackBar(
            'Não foi possível efetuar o login, verique email e senha ou entre em contato com o administrador', '',
            'action-error');
          this.loginForm.reset();
        }
      );
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
