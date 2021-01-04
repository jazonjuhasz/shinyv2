import {Component, OnInit} from '@angular/core';
import {MenuBtnService} from '../../services/c2c/menu-btn.service';

@Component({
  selector: 'app-sidenav-container',
  template: `
    <app-header (sidenavTriggered)='sidenav.toggle()'></app-header>
    <mat-sidenav-container class="sidenav-container">
      <mat-sidenav #sidenav class="sidenav" mode="over"
                   (click)="sidenav.toggle()" (closedStart)="closeAnimation()">
        <mat-nav-list>
          <span>
            <button mat-button routerLink="/index" routerLinkActive="router-link-active">{{'sidenav.index' | translate}}</button>
            <button mat-button routerLink="/user" routerLinkActive="router-link-active">{{'sidenav.users' | translate}}</button>
            <button mat-button routerLink="/gift" routerLinkActive="router-link-active">{{'sidenav.gifts' | translate}}</button>
          </span>
        </mat-nav-list>
      </mat-sidenav>
      <router-outlet></router-outlet>
    </mat-sidenav-container>
  `,
  styles: [`
    .sidenav {
      display: flex;
      width: 170px;
      opacity: 1;
    }

    .mat-nav-list {
      display: flex;
      border: 170px;
    }

    button {
      display: flex;
      width: 170px;
    }
  `]
})
export class SidenavContainerComponent implements OnInit {

  constructor(private menuBtnService: MenuBtnService) {
  }


  closeAnimation() {
    this.menuBtnService.menuClicked(false);
  }

  ngOnInit(): void {
  }

}
