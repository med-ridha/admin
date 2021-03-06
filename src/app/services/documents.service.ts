import { Injectable } from '@angular/core';
import { WebService } from './web.service';

@Injectable({
  providedIn: 'root'
})
export class DocumentsService {
  constructor(private webService: WebService) { }
  getDocuments(token: string) {
    return this.webService.get('documents/all', token);
  }
  
  getAllSearch(token: string){
    return this.webService.get('search/all', token)
  }

  getAllModules(token: string){
    return this.webService.get('modules/getAll/', token)
  }

  getModuleById(moduleId: string, token: string){
    return this.webService.get('modules/getModuleById/'+moduleId, token)
  }

  getModule(moduleId: string, token: string){
    return this.webService.get('modules/getModule/'+moduleId, token)
  }

  findDocument(search: string, token: string) {
    return this.webService.get(`documents/search${search}`, token);
  }

  getDocument(documentId: string, token: string) {
    return this.webService.get(`documents/one/${documentId}`, token);
  }

  checkDocument(payload: any, token: string) {
    return this.webService.post('documents/checkValid', payload, token);
  }

  createDocument(payload: any, token: string) {
    return this.webService.post('documents/add', payload, token);
  }

  deleteDocument(payload: any, token: string) {
    return this.webService.delete('documents/delete/' , payload, token);
  }

  updateDocument(payload: any, token: string) {
    return this.webService.put('documents/update/', payload, token);
  }
}
