import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Subscription } from 'rxjs';
import { Friend } from '../models/friend';
import { Gift } from '../models/gift';
import { FriendService } from '../services/friend.service';

@Component({
    selector: 'app-gift-away-modal',
    template: `
    <h2 mat-dialog-title><strong>{{'gift.giftifyText' | translate}}</strong></h2>
    <mat-dialog-content class="mat-typography">
      <mat-selection-list [multiple]=false [(ngModel)]="selectedFriend">
        <mat-list-option *ngFor="let item of friends" [value]="item">
            <div class="listItem">
                <i *ngIf="item.wish==true" class="material-icons" matTooltip="{{'wishlist.on' | translate}}">card_giftcard</i>
                {{item.name}}
            </div>
        </mat-list-option>
        </mat-selection-list>


    <div class="actions">
      <button mat-stroked-button mat-dialog-close color="primary">{{'common.cancel' | translate}}</button>
      <button mat-stroked-button [mat-dialog-close]="selectedFriend" color="primary" [disabled]="!selectedFriend">{{'gift.send' | translate}}</button>
    </div>
        
    </mat-dialog-content>
  `,
    styles: [`
    h2 {
        display: flex;
        justify-content: center;
        align-items: center;
    }
    .actions {
        display: flex;
        flex-direction: row;
        justify-content: center;
    }
  button {
      margin-top: 20px;
      margin-right: 10px;
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
export class GiftAwayModalComponent implements OnInit {
    subscriptions$: Subscription[] = [];
    friends: Friend[] = [];
    selectedFriend: Friend;

    gift: Gift;

    constructor(
        @Inject(MAT_DIALOG_DATA) public data: any,
        private friendService: FriendService
    ) {
        if (data) { this.gift = data.gift; }
    }

    ngOnInit() {
        this.fetchFriends();
    }

    ngOnDestroy() {
        this.subscriptions$.forEach(sub => sub.unsubscribe());
    }

    fetchFriends() {
        this.subscriptions$.push(this.friendService.fetchFriends().subscribe(
            (res: Friend[]) => {
                this.friends = res;
                this.friends.map(u => {
                    u.name = u.firstName + ' ' + u.lastName;
                    u.wish = false;
                });
                this.filterPendingFriends();
                this.applyWishProperty();
            }
        ));
    }

    filterPendingFriends() {
        this.friends = this.friends.filter(e => {
            return e.pending === false;
        });
    }

    applyWishProperty() {
        this.subscriptions$.push(this.friendService.fetchMyFriendsWishOnThisGift(this.gift.giftId).subscribe(
            (res: Friend[]) => {
                res.map(f => {
                    this.friends.find(e => e.id == f.id).wish = true;
                })
            }
        ))
    }
}
