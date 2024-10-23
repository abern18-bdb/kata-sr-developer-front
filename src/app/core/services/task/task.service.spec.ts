import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { TaskService } from './task.service';
import jwtDecode from 'jwt-decode';

describe('TaskService', () => {
  let service: TaskService;
  let httpMock: HttpTestingController;

  const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjoiYWRtaW4iLCJpYXQiOjE3Mjk2NDc4MzEsImV4cCI6MTcyOTY1MTQzMX0.uYObWy0U_K2wWmrtsvfL6JG2bmz7R_1UWjnoZz2YcOs';
  const user = { user: 'admin' };

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [TaskService]
    });
    service = TestBed.inject(TaskService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should get tasks', () => {
    const mockTasks = [{ id: 1, title: 'Test Task' }];

    service.getTasks(token).subscribe(tasks => {
      expect(tasks).toEqual(mockTasks);
    });

    const req = httpMock.expectOne('http://localhost:8001/api/V1/tasks/list');
    expect(req.request.method).toBe('GET');
    req.flush(mockTasks);
  });

  it('should delete a task', () => {
    const taskId = 1;

    service.deleteTask(taskId, token).subscribe(response => {
      expect(response).toBeUndefined();
    });

    const req = httpMock.expectOne(`http://localhost:8001/api/V1/tasks?id=${taskId}`);
    expect(req.request.method).toBe('DELETE');
    req.flush({});
  });

  it('should update a task', () => {
    const taskId = 1;
    const taskData = { title: 'Updated Task' };
    const user = jwtDecode(token) as any;
    user.user = user.user;

    service.updateTask(taskId, taskData, token).subscribe(response => {
      expect(response).toEqual({});
    });

    const req = httpMock.expectOne(`http://localhost:8001/api/V1/tasks?id=${taskId}`);
    expect(req.request.method).toBe('PUT');
    expect(req.request.headers.get('Authorization')).toBe(token);
    expect(req.request.headers.get('x-user')).toBe(user.user);
    req.flush({});
  });

  it('should create a task', () => {
    const taskData = { title: 'New Task' };

    service.createTask(taskData, token).subscribe(response => {
      expect(response).toEqual({});
    });

    const req = httpMock.expectOne('http://localhost:8001/api/V1/tasks/create');
    expect(req.request.method).toBe('POST');
    expect(req.request.headers.get('Authorization')).toBe(token);
    expect(req.request.headers.get('x-user')).toBe(user.user);
    req.flush({});
  });
});
