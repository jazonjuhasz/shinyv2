import { HttpErrorResponse } from '@angular/common/http';
import {Component, Input, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { Subscription } from 'rxjs';
import { FeedbackModalComponent } from '../modals/feedback-modal.component';
import {User, UserCreate} from '../models/user';
import {UserService} from '../services/user.service';

@Component({
  selector: 'app-new-user',
  template: `
    <form [formGroup]="newUser">
      <div class="panel panel-default">
      <div></div>
        <div>
        <mat-form-field class="full-width-input" appearance="outline">
          <mat-label>{{'register.username' | translate }}</mat-label>
          <input matInput placeholder="{{'register.username' | translate }}"
            id="userName"
            type="text"
            formControlName="userName"
            autocomplete="off"
            required/>
        </mat-form-field>
        </div>
        <div>
        <mat-form-field class="full-width-input" appearance="outline">
          <mat-label>{{'register.firstName' | translate }}</mat-label>
          <input matInput placeholder="{{'register.firstName' | translate }}"
            type="text"
            id="firstName"
            formControlName="firstName"
            autocomplete="off"
            required/>
        </mat-form-field>
        </div>
        <div>
        <mat-form-field class="full-width-input" appearance="outline">
          <mat-label>{{'register.lastName' | translate }}</mat-label>
          <input matInput placeholder="{{'register.lastName' | translate }}"
            type="text"
            id="lastName"
            formControlName="lastName"
            autocomplete="off"
            required/>
        </mat-form-field>
        </div>
        <div>
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
        </div>
        <div>
        <mat-form-field class="full-width-input" appearance="outline">
          <mat-label>{{'register.password' | translate }}</mat-label>
          <input matInput placeholder="{{'register.password' | translate }}"
            type="password"
            id="password"
            formControlName="password"
            minlength="6"
            autocomplete="off"
            required/>
        </mat-form-field>
        </div>

      </div>
    </form>
    <div class="actions" align="center">
      <button class="second" mat-stroked-button color="primary"
              [disabled]="newUser.invalid" (click)="onSave()"
              [mat-dialog-close]="createdUser">{{'common.save' | translate}}</button>
    </div>
  `,
  styles: []
})
export class NewUserComponent implements OnInit {
  subscriptions$: Subscription[] = [];
  newUser = new FormGroup({
    userName: new FormControl(null, [Validators.required]),
    firstName: new FormControl(null, [Validators.required]),
    lastName: new FormControl(null, [Validators.required]),
    email: new FormControl(null, [Validators.required]),
    password: new FormControl(null, [Validators.required])
  });
  isPasswordVisible = false;
  createdUser: User;

  @Input() userToEdit: User;

  constructor(private userService: UserService, private dialog: MatDialog) {
  }

  onSave() {
    let user: User = {
      userName: this.newUser.get('userName').value,
      firstName: this.newUser.get('firstName').value,
      lastName: this.newUser.get('lastName').value,
      email: this.newUser.get('email').value,
      password: this.newUser.get('password').value
    }
    if (this.userToEdit) {
      this.userService.update(this.userToEdit.id, user).subscribe(res => {
        this.openFeedbackModal(true)},
        (error: HttpErrorResponse) => { this.openFeedbackModal(false) })
    } else {
      this.userService.create(user).subscribe(res => {
        this.openFeedbackModal(true)},
        (error: HttpErrorResponse) => { this.openFeedbackModal(false) })
        
    }
  }

  openFeedbackModal(data: boolean) {
    const dialogRef = this.dialog.open(FeedbackModalComponent, {
      data
    });
    this.subscriptions$.push(dialogRef.afterOpened().subscribe(() => {
      setTimeout(() => {
        dialogRef.close();
      }, 1200)
    }))
  }

  onShowPassword() {
    return this.isPasswordVisible = !this.isPasswordVisible;
  }

  ngOnInit(): void {
    if (this.userToEdit) {
      this.newUser.patchValue(this.userToEdit);
    }
  }

}
