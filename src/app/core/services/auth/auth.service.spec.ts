import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { AuthService } from './auth.service';

describe('AuthService', () => {
  let service: AuthService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [AuthService]
    });
    service = TestBed.inject(AuthService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should login successfully', () => {
    const mockResponse = { token: 'token' };
    const username = 'user';
    const password = 'password';

    service.login(username, password).subscribe(response => {
      expect(response).toEqual(mockResponse);
    });

    const req = httpMock.expectOne('http://localhost:8001/api/login');
    expect(req.request.method).toBe('POST');
    req.flush(mockResponse);
  });

  it('should handle login error', () => {
    const username = 'user';
    const password = 'password';

    service.login(username, password).subscribe(
      response => fail('should have failed with the 500 error'),
      error => {
        expect(error.status).toBe(500);
      }
    );

    const req = httpMock.expectOne('http://localhost:8001/api/login');
    req.flush('Login failed', { status: 500, statusText: 'Server Error' });
  });
});
