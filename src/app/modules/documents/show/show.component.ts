import { Component, OnInit } from '@angular/core';
import DocumentJ from 'src/app/models/documentJ';
import Modules from 'src/app/models/modules';
import { DocumentsService } from 'src/app/services/documents.service';

@Component({
  selector: 'app-show',
  templateUrl: './show.component.html',
  styleUrls: ['./show.component.scss']
})
export class ShowComponent implements OnInit {

  documents: DocumentJ[] = []
  constructor(private documentService: DocumentsService) { }

  modules: Modules[];

  ngOnInit(): void {
    let token = localStorage.getItem('token') ?? "";
    this.documentService.getAllModules(token).subscribe((result: any) => {
      if (result.code == 0) {
        this.modules = result.message;
      } else {
        console.log(result);
      }
    })
    this.documentService.getDocuments(token).subscribe((result: any) => {
      if (result.code == 0) {
        this.documents = result.message;
        this.getMod(this.documents[0].moduleId);
      } else {
        console.log(result.message);
      }
    })
  }

  printdocument(id: string) {
    console.log(id);
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
