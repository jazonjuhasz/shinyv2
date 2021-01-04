import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../services/auth.service';
import { HttpErrorResponse } from '@angular/common/http';
import { UserService } from '../services/user.service';
import { User } from '../models/user';

@Component({
  selector: 'app-register',
  template: `
    <div class="flex-container">
      <div class="flex-item">

      <div class="toLoginContainer">
    <button mat-stroked-button color="primary" type="submit" (click)="onLogin()">{{'register.login' | translate}}</button>
    </div>

        <mat-card class="mat-elevation-z4">
          <mat-card-content>
            <form [formGroup]="registerForm">
              <h3>{{'register.register' | translate}}</h3>
              <div class="panel panel-default">
              <mat-form-field class="full-width-input" appearance="outline">
                <mat-label>{{'register.username' | translate }}</mat-label>
                  <input matInput placeholder="{{'register.username' | translate }}"
                         type="text"
                         id="userName"
                         formControlName="userName"
                         autocomplete="off"
                         minlength="6"
                         required/>
                </mat-form-field>
                <mat-form-field class="full-width-input" appearance="outline">
                  <mat-label>{{'register.firstName' | translate }}</mat-label>
                  <input matInput placeholder="{{'register.firstName' | translate }}"
                         type="text"
                         id="firstName"
                         formControlName="firstName"
                         autocomplete="off"
                         required/>
                </mat-form-field>
                <mat-form-field class="full-width-input" appearance="outline">
                  <mat-label>{{'register.lastName' | translate }}</mat-label>
                  <input matInput placeholder="{{'register.lastName' | translate }}"
                         type="text"
                         id="lastName"
                         formControlName="lastName"
                         autocomplete="off"
                         required/>
                </mat-form-field>
                <mat-form-field class="full-width-input" appearance="outline">
                  <mat-label>{{'register.email' | translate }}</mat-label>
                  <input matInput placeholder="{{'register.email' | translate }}"
                         type="text"
                         id="email"
                         formControlName="email"
                         autocomplete="off"
                         minlength="6"
                         required/>
                </mat-form-field>
                <mat-form-field class="full-width-input" appearance="outline">
                  <mat-label>{{'register.password' | translate }}</mat-label>
                  <input matInput placeholder="{{'register.password' | translate }}"
                         type="password"
                         id="password"
                         formControlName="password"
                         autocomplete="off"
                         minlength="6"
                         required/>
                </mat-form-field>
              </div>
            </form>
            <button mat-stroked-button color="primary" type="submit" (click)="onRegister()"
                    [disabled]="registerForm.invalid">{{'register.register' | translate}}</button>
          </mat-card-content>
        </mat-card>

        <div class="loginErrorContainer" *ngIf="isSuccess">
          <mat-card class="successColor">
            {{'register.success' | translate}}
          </mat-card>
        </div>

      <div class="loginErrorContainer" *ngIf="isFailed">
        <mat-card class="failColor">
          {{'register.fail' | translate}}
        </mat-card>
      </div>

    </div>
  `,
  styles: [`

    .toLoginContainer {
      margin-top: -60px;
      display: flex;
      align-items: center;
      justify-content: center;
      margin-bottom: 30px;
    }

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
      margin-top: 25px;
      margin-bottom: 30px;
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

    button {
        margin-top: 10px;
    }

    .successColor {
      color: #32CD32;
    }

    .failColor {
      color: #FF0000;
    }

    @media only screen and (max-width: 600px){
      mat-form-field {
        width: 90%;
      }
    }
  `],
})
export class RegisterComponent implements OnInit {
  registerForm: FormGroup;
  errors: string[];
  isSuccess = false;
  isFailed = false;


  constructor(private authService: AuthService, private router: Router, private userService: UserService) {
  }

  ngOnInit(): void {
    this.registerForm = new FormGroup({
      userName: new FormControl(null, [Validators.required]),
      firstName: new FormControl(null, [Validators.required]),
      lastName: new FormControl(null, [Validators.required]),
      email: new FormControl(null, [Validators.required]),
      password: new FormControl(null, [Validators.required])
    });
  }

  public onLogin() {
    this.router.navigate(['login']);
  }

  public onRegister() {
    let user: User = {
      userName: this.registerForm.get('userName').value,
      firstName: this.registerForm.get('firstName').value,
      lastName: this.registerForm.get('lastName').value,
      email: this.registerForm.get('email').value,
      password: this.registerForm.get('password').value
    }
    this.userService.create(user)
      .subscribe(
        () => {
          this.registerForm.reset();
          this.isSuccess = true;
          setTimeout(() => {
            this.isSuccess = false;
            this.router.navigate(['login']);
          }, 4500);
        },
        (error: HttpErrorResponse) => {
          this.errors = error.error;
          if (error.status === 400) {
            this.registerError();
          }
        }
      );
  }

  registerError() {
    this.registerForm.reset();
    this.isFailed = true;
    setTimeout(() => {
      this.isFailed = false;
    }, 3000);
  }

}
