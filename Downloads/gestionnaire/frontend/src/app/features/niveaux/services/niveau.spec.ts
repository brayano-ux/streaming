import { TestBed } from '@angular/core/testing';

import { Niveau } from './niveau';

describe('Niveau', () => {
  let service: Niveau;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(Niveau);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
