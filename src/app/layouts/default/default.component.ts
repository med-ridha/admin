import { Component, OnInit, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-default',
  templateUrl: './default.component.html',
  styleUrls: ['./default.component.scss']
})

export class DefaultComponent implements OnInit {
  sideBarOpen: boolean = true;

  constructor() { }

  ngOnInit(): void {
  }

  sideBarToggler(event: EventEmitter<any>) {
    this.sideBarOpen = !this.sideBarOpen;
  }

}
