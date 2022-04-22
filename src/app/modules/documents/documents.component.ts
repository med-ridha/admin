import { Component, OnInit } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import DocumentJ from 'src/app/models/documentJ';
import { DocumentsService } from 'src/app/services/documents.service';
import { ShowOneDocumentComponent } from './show-one-document/show-one-document.component';

@Component({
  selector: 'app-documents',
  templateUrl: './documents.component.html',
  styleUrls: ['./documents.component.scss']
})
export class DocumentsComponent implements OnInit {
  show: boolean = false;
  constructor(private route: Router) { }
  url: NavigationEnd;
  ngOnInit(): void {
    if (this.route.url == '/documents/show') {
      this.show = true;
    } else {
      this.show = false;
    }
    console.log('here')
    this.route.events.subscribe((val) => {
      if (val instanceof NavigationEnd) {
        this.url = val;
        console.log(this.url.urlAfterRedirects);
        console.log(val);
        if (this.url.urlAfterRedirects === '/documents/show') {
          this.show = true;
        } else {
          this.show = false;
        }
      }
    });
  }

  toggleButtons() {
    this.show = !this.show;
  }

}
