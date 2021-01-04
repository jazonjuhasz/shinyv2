import {Component} from '@angular/core';
import {TranslateService} from '@ngx-translate/core';


@Component({
  selector: 'app-root',
  template: `
    <app-sidenav-container></app-sidenav-container>
  `,
  styles: [`
    :host ::ng-deep.mat-sidenav-container {
      height: calc(100vh - 64px) !important;
    }
  `]
})

export class AppComponent {
  constructor(private translate: TranslateService) {
    const value = localStorage.getItem('lang');
    if (value) {
      translate.setDefaultLang(value);
    } else {
      translate.setDefaultLang('en');
    }
  }
}
