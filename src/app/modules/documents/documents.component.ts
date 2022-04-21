import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-documents',
  templateUrl: './documents.component.html',
  styleUrls: ['./documents.component.scss']
})
export class DocumentsComponent implements OnInit {
  show: boolean = false;
  constructor(private route: Router) { }

  ngOnInit(): void {
    if (this.route.url === "/documents/show") {
      this.show = true;
    } else {
      this.show = false;
    }
  }

  toggleButtons() {
    this.show = !this.show;
  }

}
