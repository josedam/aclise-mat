import { Injectable } from '@angular/core';
import { BACK_URL } from 'src/app/auth/auth.config';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http: HttpClient) { }

  getAll() {
    const url = `${BACK_URL}/users`;
    return this.http.get(url);

  }

}
