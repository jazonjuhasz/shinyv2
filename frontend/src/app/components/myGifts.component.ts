import { HttpErrorResponse } from '@angular/common/http';
import { Component, Input, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Subscription } from 'rxjs';
import { DeleteModalComponent } from '../modals/delete-modal.component';
import { FeedbackModalComponent } from '../modals/feedback-modal.component';
import { FriendsModalComponent } from '../modals/friends-modal.component';
import { GiftAwayModalComponent } from '../modals/gift-away-modal.component';
import { WishListModalComponent } from '../modals/wishlist-modal.component';
import { Friend } from '../models/friend';
import { Gift, GiftAway, MyGift } from '../models/gift';
import { GiftService } from '../services/gift.service';

@Component({
    selector: 'app-myGifts',
    template: `
    <button class="getNewButton" mat-stroked-button color="primary" (click)="onGetNewGift()">{{'gift.getOffer' | translate}}</button>
    <button class="getNewButton" mat-stroked-button color="primary" (click)="onOpenWishListModal()">{{'wishlist.wishlist' | translate}}</button>
    <button class="getNewButton" mat-stroked-button color="primary" (click)="onOpenFriendsModal()">{{'sidenav.friends' | translate}}</button>


    <div class="wrapper">
        <div *ngFor="let item of myGifts; let i = index">
        <mat-card appMatCardElevation [defaultElevation]="1" raisedElevation="4">
          <mat-card-header>
              <div class="header">
                  <mat-card-title id="One" class="header">
                      <span>{{item.name}}</span>
                  </mat-card-title>
                  </div>
          </mat-card-header>
          <mat-card-content>
              <div class="mat-card-content-size">
                  <span>{{item.description}}</span>
              </div>
              <div class="detailButtons">
                <button mat-stroked-button color="primary" (click)="onGiftTheGift(item)">{{'gift.giftify' | translate}}</button>
                <button mat-stroked-button color="warn" (click)="onOpenDeleteModal(item)">{{'common.delete' | translate}}</button>
              </div>
          </mat-card-content>
      </mat-card>
      </div>
    </div>
  `,
    styles: [`
    .wrapper {
          max-width: 1200px;
          margin-left: auto;
          margin-right: auto;
          display: grid;
          grid-template-rows: auto;
          grid-template-columns: repeat(3, 1fr);
          grid-column-gap: 1em;
      }

      .getNewButton {
          margin-top: 20px;
          margin-left: 50px;
      }

      .header {
          margin-top: 5px;
          display: flex;
          flex: 1 1;
          margin-left: -16px;
          justify-content: center;
      }
      .detailButtons {
          margin-top: 20px;
          margin-left: auto;
          margin-right: auto;
          display: grid;
          grid-template-rows: auto;
          grid-template-columns: 1fr 1fr;
          grid-column-gap: 1em;
      }
      .mat-card-content-size {
          font-size: 12px;
          margin-left: 5px;
      }

      mat-card {
          width: 350px;
          margin: 30px auto;
          padding: 5px;
      }
  `],
})
export class MyGiftsComponent implements OnInit {
    subscriptions$: Subscription[] = [];
    myGifts: Array<MyGift>;

    constructor(
        private giftService: GiftService,
        private dialog: MatDialog) {
    }
    
    ngOnInit() {
        this.fetchMyGifts();
    }

    ngOnDestroy() {
        this.subscriptions$.forEach(sub => sub.unsubscribe());
    }
    
    fetchMyGifts() {
        this.subscriptions$.push(this.giftService.myGifts().subscribe(
            (res: MyGift[]) => {
                this.myGifts = res;
            }))
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

    onOpenDeleteModal(gift) {
        const dialogRef = this.dialog.open(DeleteModalComponent, {
            data: { name: gift.name }
        });
        this.subscriptions$.push(dialogRef.afterClosed().subscribe(result => {
            if (result) {
                this.giftService.deleteMyGift(gift.id).subscribe(
                    res => {
                        this.openFeedbackModal(true);
                        this.fetchMyGifts();
                    },
                    (error: HttpErrorResponse) => { this.openFeedbackModal(false) })
            }
        }));
    }

    onGetNewGift() {
        this.giftService.getNewGift().subscribe(
            () => { this.fetchMyGifts();}
        );
    }

    onGiftTheGift(gift: Gift) {
        const dialogRef = this.dialog.open(GiftAwayModalComponent, {
            data: { gift }
        });
        this.subscriptions$.push(dialogRef.afterClosed().subscribe((result: Friend) => {
            if (result) {
                let giftAway: GiftAway =
                {
                    id: gift.id,
                    giftId: gift.giftId,
                    userId: result[0].userId
                }
                this.subscriptions$.push(this.giftService.giftMyGift(giftAway).subscribe(res => {
                    this.openFeedbackModal(true);
                    this.fetchMyGifts();
                },
                    (error: HttpErrorResponse) => { this.openFeedbackModal(false) }))
            }
        }));
    }

    onOpenWishListModal() {
        const dialogRef = this.dialog.open(WishListModalComponent);
    }

    onOpenFriendsModal() {
        const dialogRef = this.dialog.open(FriendsModalComponent);
    }
}
