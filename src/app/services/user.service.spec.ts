import { TestBed } from '@angular/core/testing';

import { UserService } from './user.service';

describe('UserService', () => {
  let service: UserService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(UserService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should return all users', () => {
    const users = service.getUsers();
    expect(users.length).toBe(10);
  });

  it('should get user by ID', () => {
    const user = service.getUserById('U001');
    expect(user?.firstName).toBe('John');
  });

  it('should add new user', () => {
    const initialCount = service.getUsers().length;
    const newUser = new (require('../models/User').User)('U011');
    service.addUser(newUser);
    expect(service.getUsers().length).toBe(initialCount + 1);
  });

  it('should remove user by ID', () => {
    const initialCount = service.getUsers().length;
    service.removeUser('U001');
    expect(service.getUsers().length).toBe(initialCount - 1);
  });

  it('should get users by type', () => {
    const admins = service.getUsersByType('Admin');
    expect(admins.length).toBeGreaterThan(0);
  });
});
