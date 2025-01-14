import { TestBed } from '@angular/core/testing';

import { AuthService } from './auth.service';
import { provideHttpClient, withFetch } from '@angular/common/http';
import { HttpTestingController, provideHttpClientTesting } from '@angular/common/http/testing';
import { firstValueFrom } from 'rxjs';

describe('AuthService', () => {
  let service: AuthService;
  let httpTestingController: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        provideHttpClient(withFetch()),
        provideHttpClientTesting(),
        AuthService
      ]
    });
    service = TestBed.inject(AuthService);
    httpTestingController = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpTestingController.verify();
  });

  it('should be a correct login', async () => {
    //give
    const mockResponse = { accessToken: '123', refreshToken: '456' };
    //when
    const login$ = service.login('test@test.com', 'password');
    const loginPromise = firstValueFrom(login$);

    const req = httpTestingController.expectOne('http://localhost:3000/api/auth/login');
    expect(req.request.method).toBe('POST');
    expect(req.request.body).toEqual({ email: 'test@test.com', password: 'password' });

    req.flush(mockResponse);
    //then
    expect(await loginPromise).toEqual(mockResponse);
  });
});
