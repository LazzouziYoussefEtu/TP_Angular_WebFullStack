import { TestBed } from '@angular/core/testing';
import { provideHttpClient } from '@angular/common/http';
import { HttpTestingController, provideHttpClientTesting } from '@angular/common/http/testing';
import { LoginService } from './login.service';
import { User } from '../models/User';

describe('LoginService', () => {
  let service: LoginService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        LoginService,
        provideHttpClient(),
        provideHttpClientTesting()
      ]
    });
    service = TestBed.inject(LoginService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should login a user', () => {
    const mockUser: User = new User('testId');
    mockUser.email = 'test@test.com';
    mockUser.firstName = 'Test';
    mockUser.lastName = 'User';
    mockUser.password = 'password';
    
    const credentials = { email: 'test@test.com', password: 'password' };

    service.login(credentials).subscribe(user => {
      expect(user.email).toBe('test@test.com');
      // Note: We might need to adjust this expectation depending on how the service handles the user object reconstruction
      // For now, checking email is sufficient to prove the flow works
    });

    const req = httpMock.expectOne('http://localhost:3001/api/signin');
    expect(req.request.method).toBe('POST');
    // The API returns a plain JSON object, not a class instance. 
    // The service might be casting it or just passing it through.
    // We should return a structure that matches what the API returns.
    req.flush({ message: 'Success', user: { 
      email: 'test@test.com', 
      firstName: 'Test', 
      lastName: 'User' 
    }});
  });

  it('should handle login error', () => {
    const credentials = { email: 'wrong@test.com', password: 'wrong' };

    service.login(credentials).subscribe({
      next: () => fail('Login should have failed'),
      error: (error) => {
        expect(error.message).toBe('Email ou mot de passe incorrect');
      }
    });

    const req = httpMock.expectOne('http://localhost:3001/api/signin');
    req.flush('Unauthorized', { status: 401, statusText: 'Unauthorized' });
  });
});
