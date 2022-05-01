import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, Params, Router } from '@angular/router';
import Categories from 'src/app/models/categories';
import DocumentJ from 'src/app/models/documentJ';
import Modules from 'src/app/models/modules';
import { DocumentsService } from 'src/app/services/documents.service';

@Component({
  selector: 'app-modify-document',
  templateUrl: './modify-document.component.html',
  styleUrls: ['./modify-document.component.scss']
})
export class ModifyDocumentComponent implements OnInit {

  categories: Categories[] = [new Categories("", "", [])]
  isCatDisabled: boolean = true;
  doc: DocumentJ = new DocumentJ("", "", "", "", "", "", "", "", "", "");
  isHidden = false;
  modules: Modules = new Modules("", 0, "", this.categories, 0);
  token: string = localStorage.getItem('token') ?? "";
  dateAdded: string;
  datePu: string;
  catName: string;
  constructor(private router: ActivatedRoute, private documentService: DocumentsService, private route: Router) { }
  ngOnInit(): void {
    this.router.params.subscribe((params: Params) => {
      let docId = params['id'];
      this.documentService.getDocument(docId, this.token).subscribe((result: any) => {
        if (result.code == 0) {
          this.doc = result.message;
          this.dateAdded = new Date(this.doc.dateAdded).toDateString()
          let temp = new Date(this.doc.datePublished).toISOString().split('T')[0].split('-');
          console.log(temp);
          this.datePu = [temp[0], temp[1], temp[2]].join('-');
          console.log(this.datePu)
          this.getModuleById(this.doc.moduleId);
        } else {
          alert('something went wrong');
        }
      })
    })

  }

  switchCat() {
    this.isHidden = !this.isHidden;
  }

  checkDocument(form: NgForm) {

    //let payload = form.value;
    let payload: any = []
    payload['docId'] = this.doc._id;
    console.log(payload)
    console.log(form)
    // this.documentService.checkDocument(payload, this.token).subscribe((result: any) => {
    //   console.log(result)
    //   if (result.result === 'found') {
    //     alert('document already in the DB')
    //   }
    // })

  }

  checkTitleFrDocument(form: NgForm) {
    let payload: any = {};
    payload['titleFr'] = form
    payload['docId'] = this.doc._id;
    console.log(payload)
     this.documentService.checkDocument(payload, this.token).subscribe((result: any) => {
       console.log(result)
       if (result.result === 'found') {
         alert('document already in the DB')
       }
     })
  }

  checkTitleArDocument(form: NgForm) {
    let payload: any = {};
    payload['titleAr'] = form
    payload['docId'] = this.doc._id;
    console.log(payload)
     this.documentService.checkDocument(payload, this.token).subscribe((result: any) => {
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
    let payload = {
      docId: this.doc._id,
      payload: form.value
    }
    console.log(form.value);
    this.documentService.updateDocument(payload, this.token).subscribe((result: any) => {
      if (result.code === 0) {
        alert("updated")
        this.route.navigate([`documents/show/${this.doc._id}`])
      } else {
        alert("something went wrong");
        console.log(result)
      }
    })
  }

  getModuleById(value: string) {
    this.documentService.getModuleById(value, this.token).subscribe((result: any) => {
      if (result.code === 0) {
        this.modules = result.message;
        console.log(this.modules.id.toString())
        this.getCategories(this.modules.id.toString());
      } else {
        alert('something went wrong');
        console.log(result);
      }
    });
  }

  getCategories(value: string) {
    this.documentService.getModule(value, this.token).subscribe((result: any) => {
      if (result.code == 0) {
        this.isCatDisabled = false;
        this.modules = result.message
        this.categories = this.modules.categories
        for (let cat of this.categories) {
          for (let docId of cat.documentsIds) {
            if (docId == this.doc._id) this.catName = cat.name;
          }
        }
      } else {
        alert('something went wrong');
        console.log(result.message);
      }
    })
    console.log(value)
  }

}
