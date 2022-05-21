import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import Categories from 'src/app/models/categories';
import Modules from 'src/app/models/modules';
import { DocumentsService } from 'src/app/services/documents.service';
import { DocumentsComponent } from '../documents.component';
import { ShowComponent } from '../show/show.component';

@Component({
  selector: 'app-add-document',
  templateUrl: './add-document.component.html',
  styleUrls: ['./add-document.component.scss']
})
export class AddDocumentComponent implements OnInit {
  modules: Modules
  categories: Categories[] = []
  isCatDisabled: boolean = true;
  isHidden = false;
  token: string = localStorage.getItem('token') ?? "";
  valid: boolean = true;
  constructor(private documentService: DocumentsService, private router: Router) { }

  ngOnInit(): void {
    DocumentsComponent.docS.getDocuments(this.token).subscribe((result: any) => {
      console.log(result)
      if (result.code == 0) {
        DocumentsComponent.documents = result.message;
        ShowComponent.documents = result.message;
      } else {
        console.log(result.message);
      }
    })
  }

  switchCat() {
    this.isHidden = !this.isHidden;
  }

  checkDocument(form: NgForm) {

    this.documentService.checkDocument(form.value, this.token).subscribe((result: any) => {
      console.log(result)
      if (result.result === 'found') {
        alert('Le document existe déjà')
        this.valid = false;
      }else{
        this.valid = true;
      }
    })
  }
  waiting = false;
  onSubmit(form: NgForm) {

    if (form.value.categorie == "") {
      alert('you have to select a category');
      return;
    }
    this.waiting = true;
    this.documentService.createDocument(form.value, this.token).subscribe((result: any) => {
      if (result.code == 0) {
        this.waiting = false;
        alert("Document ajouté avec succès")
        this.router.navigate([`/documents/show/${result.message._id}`])
      } else {
        this.waiting = false;
        alert('Erreur serveur interne');
        console.log(result.message);
      }
    })
  }

  getCategories(value: string) {
    this.documentService.getModule(value, this.token).subscribe((result: any) => {
      if (result.code == 0) {
        this.isCatDisabled = false;
        this.modules = result.message
        this.categories = this.modules.categories
        for (let categorie of this.categories) console.log(categorie.name)
        console.log(this.categories)
      } else {
        alert('Erreur serveur interne');
        console.log(result.message);
      }
    })
    console.log(value)
  }

}
