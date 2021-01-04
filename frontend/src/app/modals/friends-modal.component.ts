import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Subscription } from 'rxjs';
import { DeleteModalComponent } from './delete-modal.component';
import { FeedbackModalComponent } from './feedback-modal.component';
import { Friend } from '../models/friend';
import { FriendService } from '../services/friend.service';
import { User } from '../models/user';

@Component({
    selector: 'app-friends',
    template: `
    <h2 mat-dialog-title><strong>{{'wishlist.header' | translate}}</strong></h2>
    
    <mat-button-toggle-group [(ngModel)]="choosenTab">
        <mat-button-toggle value="friends" (click)="fetchFriends()">
            <p>{{'friend.friends' | translate}}</p>
        </mat-button-toggle>
        <mat-button-toggle value="users">
            <p>{{'friend.users' | translate}}</p>
        </mat-button-toggle>
        <mat-button-toggle value="pending" (click)="fetchFriends()">
            <p>{{'friend.pending' | translate}}</p>
        </mat-button-toggle>
        <mat-button-toggle value="myRequests" (click)="fetchMyRequests()">
            <p>{{'friend.myRequests' | translate}}</p>
        </mat-button-toggle>
    </mat-button-toggle-group>

    <div [ngSwitch]=choosenTab>
        <div *ngSwitchCase="'friends'"><tab-container *ngTemplateOutlet="friends"></tab-container></div>
        <div *ngSwitchCase="'users'"><tab-container *ngTemplateOutlet="users"></tab-container></div>
        <div *ngSwitchCase="'pending'"><tab-container *ngTemplateOutlet="pending"></tab-container></div>
        <div *ngSwitchCase="'myRequests'"><tab-container *ngTemplateOutlet="myRequests"></tab-container></div>
    </div>

    <ng-template #friends>
        <mat-dialog-content>
        <mat-selection-list [multiple]=false [(ngModel)]="selectedUser">
            <mat-list-option *ngFor="let item of friendsArray" [value]="item">
                <div class="listItem">
                    {{item.name}}
                </div>
            </mat-list-option>
        </mat-selection-list>
        </mat-dialog-content>
        <div *ngIf="friendsArray.length > 0">
        <mat-dialog-actions>
            <button mat-stroked-button color="warn" [disabled]="!selectedUser" 
            (click)="onOpenDeleteModal(selectedUser[0])">{{'common.delete' | translate}}</button>
        </mat-dialog-actions>
        </div>
    </ng-template>
        
    <ng-template #users>
        <app-user-limited></app-user-limited>
    </ng-template>

    <ng-template #pending>
        <mat-dialog-content>
        <mat-selection-list [multiple]=false [(ngModel)]="selectedUser">
            <mat-list-option *ngFor="let item of pendingFriendsArray" [value]="item">
                <div class="listItem">
                    {{item.name}}
                </div>
            </mat-list-option>
        </mat-selection-list>
        </mat-dialog-content>
        <div *ngIf="pendingFriendsArray.length > 0">
        <mat-dialog-actions>
            <button mat-stroked-button color="primary" [disabled]="!selectedUser" 
            (click)="onAccept(selectedUser[0])">{{'friend.accept' | translate}}</button>
            <button mat-stroked-button color="warn" [disabled]="!selectedUser" 
            (click)="onOpenDeleteModal(selectedUser[0])">{{'common.delete' | translate}}</button>
        </mat-dialog-actions>
        </div>
    </ng-template>

    <ng-template #myRequests>
        <mat-dialog-content>
        <mat-selection-list [multiple]=false [(ngModel)]="selectedUser">
            <mat-list-option *ngFor="let item of myRequestsArray" [value]="item">
                <div class="listItem">
                    {{item.name}}
                </div>
            </mat-list-option>
        </mat-selection-list>
        </mat-dialog-content>
        <div *ngIf="myRequestsArray.length > 0">
        <mat-dialog-actions>
            <button mat-stroked-button color="warn" [disabled]="!selectedUser" 
            (click)="onOpenDeleteModal(selectedUser[0])">{{'common.delete' | translate}}</button>
        </mat-dialog-actions>
        </div>
    </ng-template>
  `,
    styles: [`
    mat-button-toggle-group {
        height: 45px;
    }
    mat-dialog-actions {
        display: flex;
        flex-direction: row;
        justify-content: center;
  }
    i {
        margin-right: 5px;
    }
        .wrapper {
          max-width: 1200px;
          margin-left: auto;
          margin-right: auto;
          display: grid;
          grid-template-rows: auto;
          grid-template-columns: repeat(5, 1fr);
          grid-column-gap: 1em;
      }

      .getNewButton {
          margin-top: 20px;
          margin-left: 50px;
      }

      .header {
          margin-top: 5px;
          display: flex;
          flex: 1 1 auto;
          margin-left: -16px;
          justify-content: center;
      }

      .mat-card-content-size {
          font-size: 12px;
          margin-left: 5px;
      }

      mat-card {
          width: 250px;
          margin: 30px auto;
          padding: 5px;
      }

    #One {
      display: flex;
      flex: 1 1 auto;
      justify-content: center;
      align-items: right;
      padding-top: 5px;
    }

    #Two {
      display: flex;
      justify-content: flex-end;
      align-items: right;
      align-self: flex-end;
      cursor: pointer;
    }
    `]
})
export class FriendsModalComponent implements OnInit {
    subscriptions$: Subscription[] = [];
    choosenTab = 'friends';
    selectedUser: User;

    incomingArray: Friend[] = [];
    friendsArray: Friend[] = [];
    pendingFriendsArray: Friend[] = [];
    myRequestsArray: Friend[] = [];

    constructor(
        private friendService: FriendService,
        private dialog: MatDialog) { }

    ngOnInit() {
        this.fetchFriends();
    }

    ngOnDestroy() {
        this.subscriptions$.forEach(sub => sub.unsubscribe());
    }

    changeTabToMyRequests() {
        this.fetchMyRequests();
    }

    fetchFriends() {
        this.subscriptions$.push(this.friendService.fetchFriends().subscribe(
            (res: Friend[]) => {
                this.selectedUser = null;
                this.incomingArray = res;
                this.pendingFriendsArray = [];
                this.friendsArray = [];
                this.incomingArray.map(u => u.name = u.firstName + ' ' + u.lastName);
                this.incomingArray.map(
                    f => {
                        if (f.pending) {
                            this.pendingFriendsArray.push(f);
                        } else {
                            this.friendsArray.push(f);
                        }
                    }
                )
            }
        ));
    }

    fetchMyRequests() {
        this.subscriptions$.push(this.friendService.fetchMyRequests().subscribe(
            (res: Friend[]) => {
                this.myRequestsArray = res;
                this.myRequestsArray.map(u => u.name = u.firstName + ' ' + u.lastName);
            }));
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

    onOpenDeleteModal(friend: Friend) {
        const dialogRef = this.dialog.open(DeleteModalComponent, {
            data: { name: friend.name }
        });
        this.subscriptions$.push(dialogRef.afterClosed().subscribe(result => {
            if (result) {
                this.friendService.delete(friend.id).subscribe(
                    res => {
                        this.openFeedbackModal(true);
                        this.selectedUser = null;
                        this.fetchFriends();
                        this.fetchMyRequests();
                    },
                    (error: HttpErrorResponse) => { this.openFeedbackModal(false) })
            }
        }));
    }

    onAccept(friend: Friend) {
        this.subscriptions$.push(this.friendService.update(friend.id)
            .subscribe(() => {
                this.openFeedbackModal(true);
                this.fetchFriends();
                this.selectedUser = null;
            },
                (error: HttpErrorResponse) => this.openFeedbackModal(false)
            
        ));
    }

}
