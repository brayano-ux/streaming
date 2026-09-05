import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NouvelleRecette } from './nouvelle-recette';

describe('NouvelleRecette', () => {
  let component: NouvelleRecette;
  let fixture: ComponentFixture<NouvelleRecette>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NouvelleRecette],
    }).compileComponents();

    fixture = TestBed.createComponent(NouvelleRecette);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
