import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class WebService {

  readonly ROOTURL;

  constructor(private http: HttpClient) {
    this.ROOTURL = "http://localhost:1337";
  }

  get(uri: string, token: string) {
    return this.http.get(`${this.ROOTURL}/${uri}`, {
      headers: {
        'Authorization': 'Bearer ' + token,
      }
    });
  }

  post(uri: string, payload: any) {
    return this.http.post(`${this.ROOTURL}/${uri}`, payload);
  }

  put(uri: string, payload: any) {
    return this.http.put(`${this.ROOTURL}/${uri}`, payload);
  }

  delete(uri: string) {
    return this.http.delete(`${this.ROOTURL}/${uri}`);
  }
}
