import { Component, EventEmitter, Inject, OnDestroy, OnInit, Output } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { Observable } from 'rxjs';
import { User } from '../../models/user';
import { MenuBtnService } from '../../services/c2c/menu-btn.service';
import { DOCUMENT } from '@angular/common';
import { TranslateService } from '@ngx-translate/core';
import { MatDialog } from '@angular/material/dialog';
import { NewUserModalComponent } from '../../modals/new-user-modal.component';

@Component({
  selector: 'app-header',
  template: `
    <mat-toolbar color="primary" role="heading">
      <mat-toolbar-row>
        <a *ngIf="user$ | async" mat-icon-button (click)=onTrigger()>
          <app-animated-icon start="menu" end="arrow_back_ios" colorStart="none" colorEnd="none"></app-animated-icon>
        </a>
        <span id="spanOne">
          <img class="logo" src="../../../assets/logo.png" alt="">
        </span>

      <span *ngIf="user">
        <button mat-icon-button [matMenuTriggerFor]="menu" id="spanTwo" class="profile">
          <span>{{user.userName }}</span>
          <mat-icon>person</mat-icon>
        </button>
        <mat-menu #menu="matMenu">

          <button mat-menu-item id="center" (click)="onOpenEditModal()">
            <span>{{user.firstName + ' ' + user.lastName}}</span>
          </button>
          <mat-divider></mat-divider>

          <div mat-menu-item id="center">
            <div class="flagEN" (click)="useLanguage('en')"></div>
            <div class="flagHU" (click)="useLanguage('hu')"></div>
          </div>
          <mat-divider></mat-divider>

          <button mat-menu-item class="toggle">
            <app-dark-mode id="center"></app-dark-mode>
          </button>
          <mat-divider></mat-divider>

          <div id="center">
            <button mat-menu-item color="primary" (click)="logout()">
            <mat-icon>exit_to_app</mat-icon>{{'sidenav.exit' | translate}}</button>
          </div>
        </mat-menu>
      </span>

      </mat-toolbar-row>
    </mat-toolbar>
  `,
  styles: [`
    .profile {
      width: 100px;
    }

    .mat-icon-button {
      border-radius: 0;
    }

    ::ng-deep .mat-menu-content{
      padding: 0px !important;
    }

    .mat-menu-item .mat-icon {
      margin-right: 5px;
    }

    .toggle {
      display: flex;
      justify-content: center;
      align-items: center;
      padding-top: 5px;
    }

    a {
      height: 64px;
      padding-top: 12px;
    }

    mat-toolbar-row {
      padding: 0;
      height: 64px;
    }

    .logo {
      display: flex;
      width: 100px;
    }

    #center {
      display: flex;
      justify-content: center;
      align-items: center;
    }

    #spanOne {
      display: flex;
      flex: 1 1 auto;
      justify-content: flex-start;
      align-items: center;
    }

    #spanTwo {
      display: flex;
      justify-content: flex-end;
      align-items: center;
      align-self: flex-end;
      margin-right: 15px;
    }

    .flagEN {
      background-image: url('../../../assets/en.svg');
      width: 30px;
      height: 30px;
      background-size: 30px 30px;
      padding: 0;
      margin-right: 10px;
    }

    .flagHU {
      background-image: url('../../../assets/hu.svg');
      width: 30px;
      height: 30px;
      background-size: 30px 30px;
      padding: 0;
    }
  `]
})
export class HeaderComponent implements OnInit {
  @Output() public sidenavTriggered: EventEmitter<void> = new EventEmitter<void>();
  user$: Observable<User> = this.authService.user;
  user: User;

  public onTrigger() {
    this.menuBtnService.menuClicked();
    this.sidenavTriggered.emit();
  }

  set setDarkMode(isDark: boolean) {
    if (isDark) {
      this.document.body.classList.add('darkMode');
    } else {
      this.document.body.classList.remove('darkMode');
    }
  }

  useLanguage(language: string) {
    this.translate.use(language);
    localStorage.setItem('lang', language);
  }

  logout() {
    this.authService.logout();
  }

  constructor(private authService: AuthService,
    private menuBtnService: MenuBtnService,
    @Inject(DOCUMENT) private document: Document,
    private translate: TranslateService,
    private dialog: MatDialog) {
  }

  onOpenEditModal() {
    let succes: boolean;
    const dialogRef = this.dialog.open(NewUserModalComponent, {
      data: {
        userToEdit: this.user
      }
    });
    dialogRef.afterClosed().subscribe(res => {
      succes = true;
      
    });
  }

  ngOnInit(): void {
    const value = localStorage.getItem('darkMode');
    if (value) {
      this.setDarkMode = JSON.parse(value);
    }
    this.user$.subscribe(user => {
      this.user = user;
    })
  }
}
