import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { User } from '../models/user';

@Component({
  selector: 'app-new-user-modal',
  template: `
    <h2 mat-dialog-title><strong>{{message}}</strong></h2>
    <mat-dialog-content class="mat-typography">
      <app-new-user [userToEdit]="userToEdit"></app-new-user>
    </mat-dialog-content>
  `,
  styles: [`
    h2 {
      display: flex;
      justify-content: center;
      align-items: center;
    }
  `]
})
export class NewUserModalComponent implements OnInit {

  userToEdit: User;
  message = 'Add New User';

  constructor(@Inject(MAT_DIALOG_DATA) public data: any) {
    if (data) {
      this.userToEdit = data.userToEdit;
    }
  }
  ngOnInit(): void {
    if (this.userToEdit) {
      this.message = 'Edit User';
    }
  }
}
