import { TestBed } from '@angular/core/testing';

import { Appointements } from './appointements';

describe('Appointements', () => {
  let service: Appointements;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(Appointements);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
