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

  post(uri: string, payload: any, token: string) {
    return this.http.post(`${this.ROOTURL}/${uri}`, payload, {
      headers: {
        'Authorization': 'Bearer ' + token,
      }
    });
  }

  put(uri: string, payload: any, token: string) {
    return this.http.put(`${this.ROOTURL}/${uri}`, payload, {
      headers: {
        'Authorization': 'Bearer ' + token,
      }
    });
  }

  delete(uri: string, payload: any, token: string) {
    return this.http.delete(`${this.ROOTURL}/${uri}`,  {
      headers: {
        'Authorization': 'Bearer ' + token,
      },
      body: payload
    });
  }
}
