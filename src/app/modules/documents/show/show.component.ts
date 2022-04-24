import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import DocumentJ from 'src/app/models/documentJ';
import Modules from 'src/app/models/modules';
import { DocumentsService } from 'src/app/services/documents.service';
import { DocumentsComponent } from '../documents.component';

@Component({
  selector: 'app-show',
  templateUrl: './show.component.html',
  styleUrls: ['./show.component.scss']
})
export class ShowComponent implements OnInit {

  static documents: DocumentJ[] = []
  modules: Modules[];

  constructor(private documentService: DocumentsService, private router: Router) { }

  getStaticDocuments(){
    return ShowComponent.documents;
  }
  async ngOnInit(): Promise<void> {
    let token = localStorage.getItem('token') ?? "";
    if (!DocumentsComponent.modules) {
      this.documentService.getAllModules(token).subscribe((result: any) => {
        if (result.code == 0) {
          this.modules = result.message;
        } else {
          console.log(result);
        }
      })
    } else {
      this.modules = DocumentsComponent.modules;
    }
    if (!DocumentsComponent.documents) {
      this.documentService.getDocuments(token).subscribe((result: any) => {
        if (result.code == 0) {
          //this.documents = result.message;
              ShowComponent.documents = result.message;
        } else {
          console.log(result.message);
        }
      })
    } else {
      //this.documents = DocumentsComponent.documents;
              ShowComponent.documents = DocumentsComponent.documents;
    }
  }
   deleteDocument(docId: string) {
     let answer = confirm('are you sure  you want to delete this document???')
     let token = localStorage.getItem('token') ?? "";
     if (answer) {
       let payload = {
         "documentId": docId,
       }
       this.documentService.deleteDocument(payload, token).subscribe((result: any) => {
         if (result.code == 0) {
           this.documentService.getDocuments(token).subscribe((result: any) => {
             if (result.code == 0) {
              // this.documents = result.message;
              ShowComponent.documents = result.message;
              DocumentsComponent.documents = result.message;
             } else {
               console.log(result.message);
             }
           })
         } else {
           alert('someting went wrong')
         }
       })
     }else{
      return;
    }
   }
  printdocument(docId: string, modId: string, catId: string) {
    console.log("docId: " + docId);
    console.log("modId: " + modId);
    console.log("catId: " + catId);
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
}
