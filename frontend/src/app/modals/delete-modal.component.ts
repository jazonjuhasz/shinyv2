import {Component, Inject, OnInit} from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-delete-modal',
  template: `
    <h2 mat-dialog-title>{{'common.confirm' | translate}} {{ name }}?</h2>
    <mat-dialog-content class="mat-typography">
    </mat-dialog-content>
    <mat-dialog-actions class="actions">
      <button mat-stroked-button mat-dialog-close color="primary" tabindex=-1>{{'common.cancel' | translate}}</button>
      <button mat-stroked-button [mat-dialog-close]="true" class="right" color="warn" tabindex=-1>{{'common.delete' | translate}}</button>
    </mat-dialog-actions>
  `,
  styles: [`
  mat-dialog-actions {
    display: flex;
    flex-direction: row;
    justify-content: center;
  }
  h2 {
    text-align: center;
  }
    `]
})
export class DeleteModalComponent implements OnInit {
  name: string;

  constructor(@Inject(MAT_DIALOG_DATA) private data: any) { }

  ngOnInit(): void {
    this.name = this.data.name;
  }

}
