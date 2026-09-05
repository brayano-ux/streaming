import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NouveauPaiement } from './nouveau-paiement';

describe('NouveauPaiement', () => {
  let component: NouveauPaiement;
  let fixture: ComponentFixture<NouveauPaiement>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NouveauPaiement],
    }).compileComponents();

    fixture = TestBed.createComponent(NouveauPaiement);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
