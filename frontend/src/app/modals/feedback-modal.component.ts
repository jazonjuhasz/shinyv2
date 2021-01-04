import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef, MatDialog } from '@angular/material/dialog';

@Component({
    selector: 'app-feedback-modal',
    template: `
    <div class="green" *ngIf="success">
        <i class="material-icons">done</i>
        <span>{{'status.success' | translate}}</span>
    </div>
    <div class="red" *ngIf="!success">
        <i class="material-icons">block</i>
        <span>{{'status.fail' | translate}}</span>
    </div>
  `,
    styles: [`
        .green {
            display: flex;
            align-items: center;
            font-size: 18px;
            color: green;
        }

        .red {
            display: flex;
            align-items: center;
            font-size: 18px;
            color: red;
        }

        .material-icons {
            transform: scale(2);
            margin-right: 10px;
            
        }
    `]
})
export class FeedbackModalComponent implements OnInit {
    name: string;
    success: boolean;

    constructor(@Inject(MAT_DIALOG_DATA) private data: boolean) { }

    ngOnInit(): void {
        this.success = this.data;
    }
}
