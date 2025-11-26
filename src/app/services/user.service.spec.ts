import { TestBed } from '@angular/core/testing';
import { firstValueFrom } from 'rxjs';

import { UserService } from './user.service';
import { User } from '../models/User';

describe('UserService', () => {
  let service: UserService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(UserService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should return all users', async () => {
    const users = await firstValueFrom(service.getUsers());
    expect(users.length).toBe(10);
  });

  it('should get user by ID', () => {
    const user = service.getUserById('U001');
    expect(user?.firstName).toBe('John');
  });

  it('should add new user', async () => {
    const usersBefore = await firstValueFrom(service.getUsers());
    const initialCount = usersBefore.length;
    const newUser = new User('U011');
    service.addUser(newUser);
    const usersAfter = await firstValueFrom(service.getUsers());
    expect(usersAfter.length).toBe(initialCount + 1);
  });

  it('should remove user by ID', async () => {
    const usersBefore = await firstValueFrom(service.getUsers());
    const initialCount = usersBefore.length;
    service.removeUser('U001');
    const usersAfter = await firstValueFrom(service.getUsers());
    expect(usersAfter.length).toBe(initialCount - 1);
  });

  it('should get users by type', () => {
    const admins = service.getUsersByType('Admin');
    expect(admins.length).toBeGreaterThan(0);
  });
});
