import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {AuthService} from '../services/auth.service';
import {HttpErrorResponse} from '@angular/common/http';

@Component({
  selector: 'app-login',
  template: `
    <div class="flex-container" (keyup.enter)="onLogin()">
      <div class="flex-item">
        <mat-card class="mat-elevation-z4">
          <mat-card-content>
            <form [formGroup]="loginForm">
              <h3>{{'login.attention' | translate}}</h3>
              <div class="panel panel-default">
                <mat-form-field class="full-width-input" appearance="outline">
                  <mat-label>{{'login.username' | translate }}</mat-label>
                  <input matInput placeholder="{{'login.username' | translate }}"
                         type="text"
                         id="username"
                         formControlName="username"
                         autocomplete="off"
                         required/>
                </mat-form-field>
                <mat-form-field class="full-width-input" appearance="outline">
                  <mat-label>{{'login.pwd' | translate }}</mat-label>
                  <input matInput placeholder="{{'login.pwd' | translate }}"
                         type="password"
                         id="password"
                         formControlName="password"
                         autocomplete="off"
                         minlength="6"
                         required/>
                </mat-form-field>
              </div>
            </form>
            <button mat-stroked-button color="primary" type="submit" (click)="onLogin()"
                    [disabled]="loginForm.invalid">{{'login.login' | translate}}</button>
          </mat-card-content>
        </mat-card>
      </div>
    </div>
    <div class="loginErrorContainer" *ngIf="loginErrorMsg">
      <mat-card class="loginError">
        {{'login.error' | translate}}
      </mat-card>
    </div>

    <div class="loginErrorContainer">
    <button mat-stroked-button color="primary" (click)="onRegister()">{{'register.attention' | translate}}</button>
    </div>
  `,
  styles: [`

    .flex-container {
      height: 300px;
      margin-top: 5%;
      display: flex;
      align-items: center;
      justify-content: center;
    }

    .loginErrorContainer {
      display: flex;
      align-items: center;
      justify-content: center;
    }

    .flex-item {
      width: 600px;
      height: 200px;
      text-align: center;
    }

    mat-card {
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 14px;
    }

    mat-form-field {
      width: 420px;
    }

    /deep/ .mat-form-field-wrapper {
      padding-bottom: 0em;
    }

    button {
        margin-top: 10px;
    }

    .loginError {
      color: #d32f2f;
    }

    @media only screen and (max-width: 600px){
      mat-form-field {
        width: 90%;
      }
    }
  `],
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;
  errors: string[];
  loginErrorMsg = false;


  constructor(private authService: AuthService, private router: Router) {
  }

  ngOnInit(): void {
    this.loginForm = new FormGroup({
      username: new FormControl(null, [Validators.required]),
      password: new FormControl(null, [Validators.required])
    });
  }

  public onLogin() {
    this.authService.login(this.loginForm.get('username').value, this.loginForm.get('password').value).subscribe(
      () => {
        this.router.navigate(['index']);
      },
      (error: HttpErrorResponse) => {
        this.errors = error.error;
        if (error.status === 404 || error.status === 403) {
          this.loginError();
        }
      }
    );
  }

  loginError() {
    this.loginForm.reset();
    this.loginErrorMsg = true;
    setTimeout(() => {
      this.loginErrorMsg = false;
    }, 3500);
  }

  onRegister() {
    this.router.navigate(['register']);
  }

}
