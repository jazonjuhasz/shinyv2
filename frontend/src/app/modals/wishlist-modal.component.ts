import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Subscription } from 'rxjs';
import { Gift } from '../models/gift';
import { GiftService } from '../services/gift.service';
import { FeedbackModalComponent } from './feedback-modal.component';

@Component({
    selector: 'app-wishlist-modal',
    template: `
    <h2 mat-dialog-title><strong>{{'wishlist.header' | translate}}</strong></h2>
    
    <mat-button-toggle-group [(ngModel)]="choosenTab">
        <mat-button-toggle value="gifts" (click)="onChangeTabToGifts()">
            <p>{{'gift.gift' | translate}}</p>
        </mat-button-toggle>
        <mat-button-toggle value="list" (click)="onChangeTabToList()">
            <p>{{'wishlist.wishlist' | translate}}</p>
        </mat-button-toggle>
    </mat-button-toggle-group>

    <div [ngSwitch]=choosenTab>
        <div *ngSwitchCase="'gifts'"><tab-container *ngTemplateOutlet="gifts"></tab-container></div>
        <div *ngSwitchCase="'list'"><tab-container *ngTemplateOutlet="list"></tab-container></div>
    </div>

    <ng-template #gifts>
        <mat-dialog-content>
        <mat-selection-list [multiple]=false [(ngModel)]="selectedGift">
            <mat-list-option *ngFor="let item of giftsArray" [value]="item">
                <div class="listItem">
                    {{item.name}}
                </div>
            </mat-list-option>
        </mat-selection-list>
        </mat-dialog-content>
        <mat-dialog-actions>
            <button mat-stroked-button color="primary" (click)="onAddToList(selectedGift[0])" [disabled]="!selectedGift">{{'wishlist.add' | translate}}</button>
        </mat-dialog-actions>
    </ng-template>

    <ng-template #list>
        <mat-dialog-content>
        <mat-selection-list [multiple]=false [(ngModel)]="selectedWish">
            <mat-list-option *ngFor="let item of wishList" [value]="item">
                <div class="listItem">
                    {{item.name}}
                </div>
            </mat-list-option>
        </mat-selection-list> 
        </mat-dialog-content>
        <mat-dialog-actions>
            <button mat-stroked-button color="warn" (click)="onDeleteFromList(selectedWish[0])" [disabled]="!selectedWish">{{'common.delete' | translate}}</button>
        </mat-dialog-actions>
    </ng-template>
  `,
    styles: [`
    mat-button-toggle-group {
        height: 45px;
    }
    h2 {
        display: flex;
        justify-content: center;
        align-items: center;
    }
    mat-dialog-actions {
        display: flex;
        flex-direction: row;
        justify-content: center;
  }
   .listItem {
        display: flex;
        flex-direction: row;
    }
    .material-icons {
        line-height: 0.85;
        margin-right: 10px;
    }
  `]
})

export class WishListModalComponent implements OnInit {
    subscriptions$: Subscription[] = [];
    giftsArray: Gift[] = [];
    wishList: Gift[] = [];
    selectedGift: Gift;
    selectedWish: Gift;
    choosenTab = 'gifts';

    constructor(
        private giftService: GiftService,
        private dialog: MatDialog) {
    }

    ngOnInit() {
        this.fetchGifts();
    }

    ngOnDestroy() {
        this.subscriptions$.forEach(sub => sub.unsubscribe());
    }

    openFeedbackModal(data) {
        const dialogRef = this.dialog.open(FeedbackModalComponent, {
            data: data
        });
        this.subscriptions$.push(dialogRef.afterOpened().subscribe(() => {
            setTimeout(() => {
                dialogRef.close();
            }, 1200)
        }))
    }

    fetchGifts() {
        this.subscriptions$.push(this.giftService.getGiftsNotOnMyList().subscribe(
            (res: Gift[]) => {
                this.giftsArray = res;
                this.selectedWish = null;
                this.selectedGift = null;
            }
        ))
    }

    fetchMyWishList() {
        this.subscriptions$.push(this.giftService.getMyWishList().subscribe(
            (res: Gift[]) => {
                this.wishList = res;
                this.selectedWish = null;
                this.selectedGift = null;
            }
        ))
    }

    onChangeTabToList() {
        this.fetchMyWishList();
    }

    onChangeTabToGifts() {
        this.fetchGifts();
    }

    onAddToList(gift: Gift) {
        this.subscriptions$.push(this.giftService.addToMyWishList(gift.id).subscribe(
            res => {
                this.selectedGift = null;
                this.fetchGifts();
            }, (error: HttpErrorResponse) => { this.openFeedbackModal(false) }
        ))
    }

    onDeleteFromList(gift: Gift) {
        this.subscriptions$.push(this.giftService.deleteFromMyList(gift.id).subscribe(
            res => {
                this.fetchMyWishList();
                this.selectedWish = null;
            }, (error: HttpErrorResponse) => { this.openFeedbackModal(false) }
        ));
    }
}
