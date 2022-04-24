import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import Categories from 'src/app/models/categories';
import Modules from 'src/app/models/modules';
import { DocumentsService } from 'src/app/services/documents.service';
import { DocumentsComponent } from '../documents.component';

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
  constructor(private documentService: DocumentsService, private router: Router) { }

  ngOnInit(): void {
  }

  switchCat() {
    this.isHidden = !this.isHidden;
  }

  checkDocument(form: NgForm) {

    this.documentService.checkDocument(form.value, this.token).subscribe((result: any) => {
      console.log(result)
      if (result.result === 'found') {
        alert('document already in the DB')
      }
    })
  }

  onSubmit(form: NgForm) {

    if (form.value.categorie == "") {
      alert('you have to select a category');
      return;
    }

    this.documentService.createDocument(form.value, this.token).subscribe((result: any) => {
      if (result.code == 0) {
        alert("document add " + result.message._id)
        DocumentsComponent.getDocuments();
        this.router.navigate([`/documents/show/${result.message._id}`])
      } else {
        alert('something went wrong');
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
        alert('something went wrong');
        console.log(result.message);
      }
    })
    console.log(value)
  }

}
