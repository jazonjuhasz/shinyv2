import {Component, Input, OnDestroy, OnInit} from '@angular/core';
import {MenuBtnService} from '../../services/c2c/menu-btn.service';
import {Subscription} from 'rxjs';

@Component({
  selector: 'app-animated-icon',
  template: `
    <mat-icon [ngClass]="{'animate' : animate}" color="{{animate ? colorEnd : colorStart}}">{{animate ? end : start}}</mat-icon>
  `,
  styleUrls: ['./animated-icon.component.scss']
})
export class AnimatedIconComponent implements OnInit, OnDestroy {
  subscriptions$: Subscription[] = [];

  @Input() start: string;
  @Input() end: string;
  @Input() colorStart: string;
  @Input() colorEnd: string;
  @Input() animate = false;

  constructor(private menuBtnService: MenuBtnService) { }

  ngOnInit() {
    this.subscriptions$.push(
    this.menuBtnService.menuClickedEvent.subscribe(
      (isMenuOpen: boolean) => {
        if (isMenuOpen !== undefined) {
          this.animate = isMenuOpen;
        } else {
          this.animate = !this.animate;
        }
    }));
  }

  ngOnDestroy(): void {
    this.subscriptions$.forEach(sub => sub.unsubscribe());
  }

}
