import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NouvelleDepense } from './nouvelle-depense';

describe('NouvelleDepense', () => {
  let component: NouvelleDepense;
  let fixture: ComponentFixture<NouvelleDepense>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NouvelleDepense],
    }).compileComponents();

    fixture = TestBed.createComponent(NouvelleDepense);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
