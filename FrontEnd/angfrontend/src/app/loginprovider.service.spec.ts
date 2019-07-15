import { TestBed } from '@angular/core/testing';

import { LoginproviderService } from './loginprovider.service';

describe('LoginproviderService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: LoginproviderService = TestBed.get(LoginproviderService);
    expect(service).toBeTruthy();
  });
});
