import { HttpErrorResponse } from '@angular/common/http';
import { Component, Input, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { Subscription } from 'rxjs';
import { FeedbackModalComponent } from '../modals/feedback-modal.component';
import { Gift } from '../models/gift';
import { GiftService } from '../services/gift.service';

@Component({
    selector: 'app-new-gift',
    template: `
    <form [formGroup]="newGift">
      <div class="panel panel-default">
      <div></div>
        <div>
        <mat-form-field class="full-width-input" appearance="outline">
            <mat-label>{{'gift.name' | translate }}</mat-label>
          <input matInput
            id="name"
            type="text"
            formControlName="name"
            autocomplete="off"
            required/>
        </mat-form-field>
        </div>
        <div>
        <mat-form-field class="full-width-input" appearance="outline">
          <mat-label>{{'gift.description' | translate }}</mat-label>
          <textarea matInput
            type="text"
            id="description"
            formControlName="description"
            autocomplete="off"
            required></textarea>
        </mat-form-field>
        </div>
      </div>
    </form>
    <div class="actions" align="center">
      <button class="second" mat-stroked-button color="primary"
              [disabled]="newGift.invalid" (click)="onSave()"
              [mat-dialog-close]="createdGift">{{'common.save' | translate}}</button>
    </div>
  `,
    styles: []
})
export class NewGiftComponent implements OnInit {
    subscriptions$: Subscription[] = [];
    newGift = new FormGroup({
        name: new FormControl(null, [Validators.required]),
        description: new FormControl(null, [Validators.required])
    });
    createdGift: Gift;

    @Input() giftToEdit: Gift;

    constructor(private giftService: GiftService, private dialog: MatDialog) {
    }

    onSave() {
        let gift: Gift = {
            name: this.newGift.get('name').value,
            description: this.newGift.get('description').value
        }
        if (this.giftToEdit) {
            this.giftService.update(this.giftToEdit.id, gift).subscribe(res => {
                this.openFeedbackModal(true)},
                (error: HttpErrorResponse) => { this.openFeedbackModal(false) })
                
        } else {
            this.giftService.create(gift).subscribe(res => {
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

    ngOnInit(): void {
        if (this.giftToEdit) {
            this.newGift.patchValue(this.giftToEdit);
        }
    }

}
