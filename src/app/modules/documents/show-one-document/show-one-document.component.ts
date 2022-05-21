import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, Params, Route, Router } from '@angular/router';
import Categories from 'src/app/models/categories';
import DocumentJ from 'src/app/models/documentJ';
import Modules from 'src/app/models/modules';
import { DocumentsService } from 'src/app/services/documents.service';
import { DocumentsComponent } from '../documents.component';
import { ShowComponent } from '../show/show.component';

@Component({
  selector: 'app-show-one-document',
  templateUrl: './show-one-document.component.html',
  styleUrls: ['./show-one-document.component.scss']
})
export class ShowOneDocumentComponent implements OnInit {
  static docu: DocumentJ;
  doc: DocumentJ = new DocumentJ("", "", "", "", "", "", "", "", "", "");
  dateAdded: string = '';
  modules: Modules[] = [new Modules("", 0, "", [new Categories("", "", [])], 0)];
  dateP: string = '';
  token: string = localStorage.getItem('token') ?? "";
  lang = true;
  switchLang() {
    this.lang = !this.lang;
  }
  constructor(private documentService: DocumentsService, private router: Router, private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.documentService.getAllModules(this.token).subscribe((result: any) => {
      if (result.code == 0) {
        this.modules = result.message;
      } else {
        console.log(result);
      }
    })
    DocumentsComponent.docS.getDocuments(this.token).subscribe((result: any) => {
      console.log(result)
      if (result.code == 0) {
        DocumentsComponent.documents = result.message;
        ShowComponent.documents = result.message;
      } else {
        console.log(result.message);
      }
    })
    this.route.params.subscribe((params: Params) => {
      let docId = params['id'];
      this.documentService.getDocument(docId, this.token).subscribe((result: any) => {
        if (result.code == 0) {
          this.doc = result.message;
          ShowOneDocumentComponent.docu = result.message;
          this.dateAdded = new Date(this.doc.dateAdded).toDateString()
          this.dateP = new Date(this.doc.datePublished).toDateString()
          console.log(this.doc)
        } else {
          alert('something went wrong');
        }
      })
    })
  }

  getMod(id: string): string {
    for (let mod of this.modules) {
      if (mod._id == id) return mod.name
    }
    return "not found"
  }
  getCat(id: string): string {
    for (let mod of this.modules) {
      for (let cat of mod.categories) {
        if (cat._id == id) return cat.name
      }
    }
    return "not found"
  }

  deleteDocumentFromup(docId: string) {

    let answer = confirm('Êtes-vous sûr de vouloir supprimer ce document?')
    let token = localStorage.getItem('token') ?? "";
    if (answer) {
      let payload = {
        "documentId": docId,
      }
      this.documentService.deleteDocument(payload, token).subscribe((result: any) => {
        if (result.code == 0) {
          this.documentService.getDocuments(token).subscribe((result: any) => {
            if (result.code == 0) {
              DocumentsComponent.documents = result.message;
              alert('Document supprimè avec succès')
              this.router.navigate(['/documents/show'])
            } else {
              console.log(result.message);
            }
          })
        } else {
          alert('someting went wrong')
        }
      })
    }
  }
}
