import { TestBed } from '@angular/core/testing';

import { CreateUser } from './create-user';

describe('CreateUser', () => {
  let service: CreateUser;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CreateUser);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
