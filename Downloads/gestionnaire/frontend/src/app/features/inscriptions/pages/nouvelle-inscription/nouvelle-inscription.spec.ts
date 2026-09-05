import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NouvelleInscription } from './nouvelle-inscription';

describe('NouvelleInscription', () => {
  let component: NouvelleInscription;
  let fixture: ComponentFixture<NouvelleInscription>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NouvelleInscription],
    }).compileComponents();

    fixture = TestBed.createComponent(NouvelleInscription);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
