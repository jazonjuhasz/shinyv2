import {Component, Inject, OnInit} from '@angular/core';
import {DOCUMENT} from '@angular/common';

@Component({
  selector: 'app-dark-mode',
  template: `
    <div class="darkmode">
      <mat-slide-toggle [checked]="value" on-change="value = !value">
      </mat-slide-toggle>
    </div>
  `,
  styles: [`
    .darkmode {
      padding: 0 10px 0 0;
    }

    /deep/ .mat-slide-toggle-bar {
      height: 14px !important;
      width: 50px !important;
    }

    /deep/ .mat-slide-toggle-thumb {
      background-image: url('../../../assets/light.png');
      width: 30px !important;
      height: 30px !important;
      background-size: 30px 30px;
    }

    /deep/ .mat-slide-toggle.mat-checked:not(.mat-disabled) .mat-slide-toggle-thumb {
      background-image: url('../../../assets/dark.png');
      width: 30px !important;
      height: 30px !important;
      background-size: 30px 30px;
    }

    /deep/ .mat-slide-toggle.mat-checked .mat-slide-toggle-thumb-container {
      transform: translate3d(20px,0,0) !important;
    }

    /deep/ .mat-slide-toggle-thumb-container {
      width: 30px !important;
      height: 30px !important;
      top: -8px !important;
    }

    /deep/ .mat-slide-toggle.mat-checked:not(.mat-disabled) .mat-slide-toggle-bar {
      background-color: rgba(43, 43, 43, 1);
    }
  `]
})
export class DarkModeComponent implements OnInit {
  private class = 'darkMode';
  private storage = 'darkMode';

  get value(): boolean {
    return this.document.body.classList.contains(this.class);
  }

  set value(isDark: boolean) {
    localStorage.setItem(this.storage, isDark.toString());

    if (isDark) {
      this.document.body.classList.add(this.class);
    } else {
      this.document.body.classList.remove(this.class);
    }
  }

  constructor(@Inject(DOCUMENT) private document: Document) {
  }

  ngOnInit(): void {
    const value = localStorage.getItem(this.storage);
    if (value) {
      this.value = JSON.parse(value);
    }
  }

}
