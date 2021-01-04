import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { BehaviorSubject, Observable, Subscription } from 'rxjs';
import { User } from '../models/user';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { UserService } from '../services/user.service';
import { animate, state, style, transition, trigger } from '@angular/animations';
import { MatDialog } from '@angular/material/dialog';
import { DeleteModalComponent } from '../modals/delete-modal.component';
import { NewUserModalComponent } from '../modals/new-user-modal.component';
import { FilterParamsModel } from '../models/filter-params-model';
import { FiltersComponent } from './filter.component';
import { FeedbackModalComponent } from '../modals/feedback-modal.component';
import { HttpErrorResponse } from '@angular/common/http';
import { FriendService } from '../services/friend.service';

@Component({
  selector: 'app-user',
  template: `
    <div class="top-filter">
      <app-filters (statusFilters)="onSearch($event)"></app-filters>
    </div>
    <div class="main">
      <nav>
        <app-filters (statusFilters)="onSearch($event)"></app-filters>
      </nav>
      <article>
        <button mat-stroked-button color="primary" (click)="onAddNewUser()">{{'user.add' | translate}}</button>
        <table mat-table [dataSource]="dataSource" multiTemplateDataRows>
          <ng-container matColumnDef="{{column}}" *ngFor="let column of displayedColumns">
            <th mat-header-cell *matHeaderCellDef> {{column}} </th>
            <td mat-cell *matCellDef="let user"> {{user[column]}} </td>
          </ng-container>

          <!-- Expanded Content Column  -->
          <ng-container matColumnDef="expandedDetail">
            <td mat-cell *matCellDef="let element; let index" [attr.colspan]="displayedColumns.length">
              <div class="element-detail"
                   [@detailExpand]="element == expandedElement ? 'expanded' : 'collapsed'">
                <div class="element-description">
                  <button mat-stroked-button color="primary" (click)="onAddFriend(element)">{{'user.addFriend' | translate}}</button>
                  <button mat-stroked-button color="primary"
                          (click)="onOpenEditModal(element)">{{'user.edit' | translate}}
                  </button>
                  <button mat-stroked-button color="warn"
                          (click)="onOpenDeleteModal(element)">{{'user.delete' | translate}}</button>
                </div>
              </div>
            </td>
          </ng-container>
          <tr mat-header-row *matHeaderRowDef="displayedColumns;  sticky: true"></tr>
          <tr mat-row *matRowDef="let element; columns: displayedColumns;"
              class="element-row"
              [class.expanded-row]="expandedElement === element"
              (click)="expandedElement = expandedElement === element ? null : element">
          </tr>
          <tr mat-row *matRowDef="let row; columns: ['expandedDetail']" class="detail-row"></tr>
        </table>
        <mat-paginator [length]="count" [pageSizeOptions]="[10, 25, 50, 100]" showFirstLastButtons
                       (page)="pageEvent()"></mat-paginator>
      </article>
    </div>
  `,
  styles: [`
    .top-filter {
    }

    .main {
      display: flex;
      margin-top: 5vh;
    }

    article {
      flex: 1;
    }

    nav {
      display: flex;
      justify-content: center;
      align-self: flex-start;
      min-width: 200px;
      flex: 0 0 12vw;
    }

    mat-icon:hover {
      cursor: pointer;
    }

    mat-icon:hover {
      cursor: pointer;
    }

    table {
      width: 100%;
    }

    tr.detail-row {
      height: 0;
    }

    tr.element-row:not(.expanded-row):hover {
      filter: brightness(90%);
    }

    tr.element-row:not(.expanded-row):active {
      filter: brightness(90%);
    }

    .element-row td {
      border-bottom-width: 0;
    }

    .element-detail {
      overflow: hidden;
      display: flex;
    }

    .element-description {
      padding: 16px;
    }

    th, td {
      overflow: hidden;
      width: 200px;
      text-overflow: ellipsis;
      white-space: nowrap;
    }

    /* mobile */
    @media only screen and (max-width: 768px) {
      article {
        width: 100%;
      }
      nav {
        display: none;
      }
      .top-filter {
        margin-left: 10px;
      }
      .main {
        margin-top: 15px;
      }
    }

    /* desktop */
    @media only screen and (min-width: 769px) {
      .top-filter {
        display: none;
      }
    }
  `],
  animations: [
    trigger('detailExpand', [
      state('collapsed', style({ height: '0px', minHeight: '0' })),
      state('expanded', style({ height: '*' })),
      transition('expanded <=> collapsed', animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')),
    ]),
  ]
})
export class UserComponent implements OnInit, OnDestroy {
  subscriptions$: Subscription[] = [];
  displayedColumns = ['id', 'userName', 'name', 'email'];
  users: User[] = [];
  dataSource: MatTableDataSource<User> = new MatTableDataSource<User>(null);
  expandedElement: User | null;
  public count: number;
  private currentFilters: FilterParamsModel;
  public users$: BehaviorSubject<User[]> = new BehaviorSubject<User[]>(null);
  obs: Observable<User[]>;

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(FiltersComponent) filter: FiltersComponent;

  constructor(private userService: UserService,
    private dialog: MatDialog,
    private friendService: FriendService
  ) {
  }

  ngOnInit(): void {
    this.currentFilters = { limit: 10, offset: 0 };
    this.fetchUsers({ limit: 10, offset: 0, name: null });
  }

  getDataSource(users: User[]) {
    this.users$.next(users);
    this.dataSource = new MatTableDataSource<User>(this.users$.getValue());
    this.obs = this.dataSource.connect();
  }

  fetchUsers(filters: FilterParamsModel) {
    this.subscriptions$.push(this.userService.fetchUsersByFilter(filters).subscribe((data) => {
      this.count = data.count;
      this.getDataSource(data.data);
      this.dataSource.data.map(u => u.name = u.firstName + ' ' + u.lastName);
    }));
  }

  onOpenEditModal(user) {
    const dialogRef = this.dialog.open(NewUserModalComponent, {
      data: { userToEdit: user }
    });
    this.subscriptions$.push(dialogRef.afterClosed().subscribe(() => {
        this.fetchUsers(this.currentFilters);
      }));
  }

  onOpenDeleteModal(user) {
    const dialogRef = this.dialog.open(DeleteModalComponent, {
      data: { name: user.name }
    });
    this.subscriptions$.push(dialogRef.afterClosed().subscribe(result => {
        this.userService.delete(user.id).subscribe(
          res => {
            this.openFeedbackModal(true);
            this.fetchUsers(this.currentFilters)},
          (error: HttpErrorResponse) => { this.openFeedbackModal(false) }
        )
    }));
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

  onAddNewUser() {
    const dialogRef = this.dialog.open(NewUserModalComponent, {});
    this.subscriptions$.push(dialogRef.afterClosed().subscribe(() => {
      this.fetchUsers(this.currentFilters);
    }));
  }

  onAddFriend(user: User) {
    this.subscriptions$.push(this.friendService.create(user.id).subscribe(
      (res) => { this.openFeedbackModal(true) },
      (error: HttpErrorResponse) => this.openFeedbackModal(false)
    ));
  }

  getLimit(): number {
    return this.paginator.pageSize;
  }

  getOffset(): number {
    return this.paginator.pageSize * this.paginator.pageIndex;
  }

  onSearch(filters: FilterParamsModel) {
    this.currentFilters = filters;
    filters.limit = this.getLimit();
    filters.offset = 0;
    this.paginator.firstPage();
    this.fetchUsers(filters);
  }

  pageEvent() {
    const filters = this.currentFilters;
    filters.limit = this.getLimit();
    filters.offset = this.getOffset();
    this.fetchUsers(filters);
    window.scroll(0, 0);
  }

  ngOnDestroy(): void {
    this.subscriptions$.forEach(sub => sub.unsubscribe());
    if (this.dataSource) {
      this.dataSource.disconnect();
    }
  }
}
