import { Injectable, EventEmitter, Output } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class MenuBtnService {
  @Output() menuClickedEvent = new EventEmitter<boolean>();

  menuClicked(isMenuOpen?: boolean) {
    this.menuClickedEvent.emit(isMenuOpen);
  }

  constructor() { }
}
