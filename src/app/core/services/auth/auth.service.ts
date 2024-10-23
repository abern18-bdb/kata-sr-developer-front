import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { delay, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiUrl = 'http://localhost:8001/api/login';

  constructor(private http: HttpClient) { }

  login(username: string, password: string): Observable<any> {
    return this.http.post(this.apiUrl, { username, password }).pipe(
      delay(2000)
    );
  }
}
