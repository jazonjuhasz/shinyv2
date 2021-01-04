import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-index',
  template: `
  <app-myGifts></app-myGifts>
  `,
  styles: [
  ]
})
export class IndexComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

}
