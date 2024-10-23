import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import jwtDecode from 'jwt-decode';

@Injectable({
  providedIn: 'root'
})
export class TaskService {
  private apiUrl = 'http://localhost:8001/api/V1/tasks';

  constructor(private http: HttpClient) { }

  getTasks(token: string): Observable<any[]> {
    const headers = new HttpHeaders().set('Authorization', `${token}`);
    return this.http.get<any[]>(`${this.apiUrl}/list`, { headers });
  }

  deleteTask(id: number, token: string): Observable<any> {
    const headers = new HttpHeaders().set('Authorization', `${token}`);
    return this.http.delete(`${this.apiUrl}?id=${id}`, { headers });
  }

  updateTask(id: number, taskData: any, token: string): Observable<any> {
    const jwtObject = jwtDecode(token) as any;
    const user = jwtObject.user;

    const headers = {
      'Authorization': token,
      'x-user': user
    };

    return this.http.put(`${this.apiUrl}?id=${id}`, taskData, { headers });
  }

  createTask(task: any, token: string): Observable<any> {
    const jwtObject = jwtDecode(token) as any;
    const user = jwtObject.user;

    const headers = {
      'Authorization': token,
      'x-user': user
    };
    return this.http.post<any>(`${this.apiUrl}/create`, task, { headers });
  }


}
