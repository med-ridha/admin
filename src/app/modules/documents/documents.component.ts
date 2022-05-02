import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { NavigationEnd, Router } from '@angular/router';
import DocumentJ from 'src/app/models/documentJ';
import Modules from 'src/app/models/modules';
import { DocumentsService } from 'src/app/services/documents.service';
import { ShowComponent } from './show/show.component';

@Component({
  selector: 'app-documents',
  templateUrl: './documents.component.html',
  styleUrls: ['./documents.component.scss']
})

export class DocumentsComponent implements OnInit {
  static modules: Modules[];
  static documents: DocumentJ[];
  modify: boolean = false;
  show: boolean = false;
  cancel: boolean = false;
  docId: string
  static docS: DocumentsService;
  isSearch: boolean;

  constructor(private route: Router, private documentService: DocumentsService) {
    DocumentsComponent.docS = documentService;
  }
  url: NavigationEnd;

  static getDocuments() {
    let token = localStorage.getItem('token') ?? "";
    DocumentsComponent.docS.getAllModules(token).subscribe((result: any) => {
      if (result.code == 0) {
        DocumentsComponent.modules = result.message;
      } else {
        console.log(result);
      }
    })
    DocumentsComponent.docS.getDocuments(token).subscribe((result: any) => {
      if (result.code == 0) {
        DocumentsComponent.documents = result.message;
      } else {
        console.log(result.message);
      }
    })
  }
  token: string = localStorage.getItem('token') ?? "";
  ngOnInit(): void {
    this.documentService.getAllModules(this.token).subscribe((result: any) => {
      if (result.code == 0) {
        DocumentsComponent.modules = result.message;
      } else {
        console.log(result);
      }
    })
    this.documentService.getDocuments(this.token).subscribe((result: any) => {
      if (result.code == 0) {
        DocumentsComponent.documents = result.message;
      } else {
        console.log(result.message);
      }
    })
    if (this.route.url == '/documents/show') {
      this.show = true;
      this.isSearch = true;
    } else {
      this.show = false;
      this.isSearch = false;
    }

    if (this.route.url.match('/[a-zA-z]*/modify/[0-9]*/*')) {
      this.cancel = true;
    } else {
      this.cancel = false;
    }

    if (this.route.url.match('/[a-zA-z]*/[a-zA-z]*/[0-9]*/*')) {
      this.docId = this.route.url.split('/')[3];
      this.modify = true;
    } else {
      this.modify = false;
    }
    this.route.events.subscribe((val) => {
      if (val instanceof NavigationEnd) {
        this.url = val;
        if (this.route.url.match('/[a-zA-z]*/modify/[0-9]*/*')) {
          this.cancel = true;
        } else {
          this.cancel = false;
        }
        if (this.route.url.match('/[a-zA-z]*/[a-zA-z]*/[0-9]*/*')) {
          this.docId = this.route.url.split('/')[3];
          this.modify = true;
        } else {
          this.modify = false;
        }
        if (this.url.urlAfterRedirects === '/documents/show') {
          this.isSearch = true;
          this.show = true;
        } else {
          this.show = false;
          this.isSearch = false;
        }
      }
    });
  }

  toggleButtons() {
    this.show = !this.show;
  }
  getStaticDocuments(): DocumentJ[] {
    return DocumentsComponent.documents ?? [];
  }
  findDocument(form: NgForm) {
    let search = "?";
    if (form.value.search.length > 0) search += "search=" + form.value.search + "&"
    if (form.value.moduleNum.length > 0) search += "module=" + form.value.moduleNum
    console.log(search)
    this.documentService.findDocument(search, this.token).subscribe((result: any) => {
      if (result.code == 0) {
        ShowComponent.documents = result.message;
      }
      else {
        ShowComponent.documents = DocumentsComponent.documents;
      }
    })
    //ShowComponent.documents = DocumentsComponent.documents.filter(doc => doc.titleFr.toLowerCase().includes(search.toLowerCase()))
  }
  cancelF() {
    this.route.navigate(['/documents/show/' + this.docId]);
  }
}
