import {AfterViewInit, Component, ElementRef, EventEmitter, OnInit, Output, ViewChild} from '@angular/core';
import {FormControl, FormGroup} from '@angular/forms';
import {FilterParamsModel} from '../models/filter-params-model';
import {fromEvent} from 'rxjs';
import {debounceTime, distinctUntilChanged, filter, tap} from 'rxjs/operators';

@Component({
  selector: 'app-filters',
  template: `
    <form [formGroup]="statusForm" (ngSubmit)="onSearch()">
      <mat-form-field>
        <input matInput #input type="text" formControlName="name"
               placeholder="{{'user.search' | translate }}" autocomplete="off">
      </mat-form-field>
    </form>
  `,
  styles: [`
    mat-divider {
      margin-top: 15px;
      margin-bottom: 10px;
    }
  `]
})
export class FiltersComponent implements OnInit, AfterViewInit {
  @Output() statusFilters: EventEmitter<FilterParamsModel> = new EventEmitter<FilterParamsModel>();
  @ViewChild('input', {static: true}) input: ElementRef;

  statusForm = new FormGroup({
    name: new FormControl(null)
  });

  constructor() {
  }

  ngOnInit(): void {
  }

  onSearch(): void {
    this.statusFilters.emit(this.statusForm.value);
  }

  onReset(): void {
    this.statusForm.reset();
    this.statusFilters.emit(this.statusForm.value);
  }

  ngAfterViewInit() {
    fromEvent(this.input.nativeElement, 'keyup')
      .pipe(
        filter(Boolean),
        debounceTime(700),
        distinctUntilChanged(),
        tap((event: KeyboardEvent) => {
          this.onSearch();
        })
      )
      .subscribe();
  }
}
