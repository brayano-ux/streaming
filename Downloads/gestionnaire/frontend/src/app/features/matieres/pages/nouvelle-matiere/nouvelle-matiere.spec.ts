import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NouvelleMatiere } from './nouvelle-matiere';

describe('NouvelleMatiere', () => {
  let component: NouvelleMatiere;
  let fixture: ComponentFixture<NouvelleMatiere>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NouvelleMatiere],
    }).compileComponents();

    fixture = TestBed.createComponent(NouvelleMatiere);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
