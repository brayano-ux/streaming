import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NouveauNiveau } from './nouveau-niveau';

describe('NouveauNiveau', () => {
  let component: NouveauNiveau;
  let fixture: ComponentFixture<NouveauNiveau>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NouveauNiveau],
    }).compileComponents();

    fixture = TestBed.createComponent(NouveauNiveau);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
