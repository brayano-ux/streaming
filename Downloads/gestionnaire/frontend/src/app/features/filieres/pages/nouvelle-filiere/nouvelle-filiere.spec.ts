import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NouvelleFiliere } from './nouvelle-filiere';

describe('NouvelleFiliere', () => {
  let component: NouvelleFiliere;
  let fixture: ComponentFixture<NouvelleFiliere>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NouvelleFiliere],
    }).compileComponents();

    fixture = TestBed.createComponent(NouvelleFiliere);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
