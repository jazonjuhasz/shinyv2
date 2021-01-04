import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Gift } from '../models/gift';

@Component({
    selector: 'app-new-gift-modal',
    template: `
    <h2 mat-dialog-title><strong>{{message}}</strong></h2>
    <mat-dialog-content class="mat-typography">
      <app-new-gift [giftToEdit]="giftToEdit"></app-new-gift>
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
export class NewGiftModalComponent implements OnInit {

    giftToEdit: Gift;
    message = 'Add New gift';

    constructor(@Inject(MAT_DIALOG_DATA) public data: any) {
        if (data) {
            this.giftToEdit = data.giftToEdit;
        }
    }
    ngOnInit(): void {
        if (this.giftToEdit) {
            this.message = 'Edit gift';
        }
    }
}
