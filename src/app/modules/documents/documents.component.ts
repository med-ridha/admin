import { Component, OnInit } from '@angular/core';
import DocumentJ from 'src/app/models/documentJ';

@Component({
  selector: 'app-documents',
  templateUrl: './documents.component.html',
  styleUrls: ['./documents.component.scss']
})
export class DocumentsComponent implements OnInit {
  documents: DocumentJ[] = []
  constructor() { }

  ngOnInit(): void {
  }

  printdocument(id: string) {
    console.log(id);
  }

}
