import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AffecterMatiere } from './affecter-matiere';

describe('AffecterMatiere', () => {
  let component: AffecterMatiere;
  let fixture: ComponentFixture<AffecterMatiere>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AffecterMatiere],
    }).compileComponents();

    fixture = TestBed.createComponent(AffecterMatiere);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
