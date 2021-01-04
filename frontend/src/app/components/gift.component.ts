import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { BehaviorSubject, Observable, Subscription } from 'rxjs';
import { Gift } from '../models/gift';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { GiftService } from '../services/gift.service';
import { animate, state, style, transition, trigger } from '@angular/animations';
import { MatDialog } from '@angular/material/dialog';
import { DeleteModalComponent } from '../modals/delete-modal.component';
import { FilterParamsModel } from '../models/filter-params-model';
import { FeedbackModalComponent } from '../modals/feedback-modal.component';
import { NewGiftComponent } from './new-gift.component';
import { NewGiftModalComponent } from '../modals/new-gift-modal.component';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-gift',
  template: `
  <article>
    <div class="center">
    <button mat-stroked-button color="primary" (click)="onAddNewGift()">{{'gift.add' | translate}}</button>
      <table mat-table [dataSource]="dataSource" multiTemplateDataRows>
        <ng-container matColumnDef="{{column}}" *ngFor="let column of displayedColumns">
          <th mat-header-cell *matHeaderCellDef> {{column}} </th>
          <td mat-cell *matCellDef="let gift"> {{gift[column]}} </td>
        </ng-container>

        <!-- Expanded Content Column  -->
        <ng-container matColumnDef="expandedDetail">
          <td mat-cell *matCellDef="let element; let index" [attr.colspan]="displayedColumns.length">
            <div class="element-detail"
              [@detailExpand]="element == expandedElement ? 'expanded' : 'collapsed'">
              <div class="element-description">
                <button mat-stroked-button color="primary"
                  (click)="onOpenEditModal(element)">{{'gift.edit' | translate}}
                </button>
                <button mat-stroked-button color="warn"
                  (click)="onOpenDeleteModal(element)">{{'gift.delete' | translate}}</button>
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
    </div>
  </article>
  `,
  styles: [`
    article {
      margin-top: 5vh;
    }

    .center {
      max-width: 50%;
      margin-left: 25%;
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
  `],
  animations: [
    trigger('detailExpand', [
      state('collapsed', style({ height: '0px', minHeight: '0' })),
      state('expanded', style({ height: '*' })),
      transition('expanded <=> collapsed', animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')),
    ]),
  ]
})
export class GiftComponent implements OnInit, OnDestroy {
  subscriptions$: Subscription[] = [];
  displayedColumns = ['id', 'name', 'description'];
  gifts: Gift[] = [];
  dataSource: MatTableDataSource<Gift> = new MatTableDataSource<Gift>(null);
  expandedElement: Gift | null;
  public count: number;
  private currentFilters: FilterParamsModel;
  public gifts$: BehaviorSubject<Gift[]> = new BehaviorSubject<Gift[]>(null);
  obs: Observable<Gift[]>;

  @ViewChild(MatPaginator) paginator: MatPaginator;

  constructor(
    private giftService: GiftService,
    private dialog: MatDialog
  ) { }

  ngOnInit(): void {
    this.currentFilters = { limit: 10, offset: 0 };
    this.fetchGifts({ limit: 10, offset: 0, name: null });
  }

  getDataSource(gifts: Gift[]) {
    this.gifts$.next(gifts);
    this.dataSource = new MatTableDataSource<Gift>(this.gifts$.getValue());
    this.obs = this.dataSource.connect();
  }

  fetchGifts(filters: FilterParamsModel) {
    this.subscriptions$.push(this.giftService.fetchGifts(filters).subscribe((data) => {
      this.count = data.count;
      this.getDataSource(data.data);
    }));
  }

  getLimit(): number {
    return this.paginator.pageSize;
  }

  getOffset(): number {
    return this.paginator.pageSize * this.paginator.pageIndex;
  }

  pageEvent() {
    const filters = this.currentFilters;
    filters.limit = this.getLimit();
    filters.offset = this.getOffset();
    this.fetchGifts(filters);
    window.scroll(0, 0);
  }

  onAddNewGift() {
    const dialogRef = this.dialog.open(NewGiftComponent, {});
    this.subscriptions$.push(dialogRef.afterClosed().subscribe(() => {
      this.fetchGifts(this.currentFilters);
    }));
  }

  onOpenEditModal(gift) {
    const dialogRef = this.dialog.open(NewGiftModalComponent, {
      data: { giftToEdit: gift }
    });
    this.subscriptions$.push(dialogRef.afterClosed().subscribe(() => {
      this.fetchGifts(this.currentFilters)}
    ));
  }

  onOpenDeleteModal(gift) {
    const dialogRef = this.dialog.open(DeleteModalComponent, {
      data: { name: gift.name }
    });
    this.subscriptions$.push(dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.giftService.delete(gift.id).subscribe(
          res => {
            this.openFeedbackModal(true);
            this.fetchGifts(this.currentFilters)},
          (error: HttpErrorResponse) => { this.openFeedbackModal(false) })
      }
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

  ngOnDestroy(): void {
    this.subscriptions$.forEach(sub => sub.unsubscribe());
    if (this.dataSource) {
      this.dataSource.disconnect();
    }
  }

}
