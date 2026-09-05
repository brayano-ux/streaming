import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NouvelEnseignant } from './nouvel-enseignant';

describe('NouvelEnseignant', () => {
  let component: NouvelEnseignant;
  let fixture: ComponentFixture<NouvelEnseignant>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NouvelEnseignant],
    }).compileComponents();

    fixture = TestBed.createComponent(NouvelEnseignant);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
