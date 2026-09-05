import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NouvelleClasse } from './nouvelle-classe';

describe('NouvelleClasse', () => {
  let component: NouvelleClasse;
  let fixture: ComponentFixture<NouvelleClasse>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NouvelleClasse],
    }).compileComponents();

    fixture = TestBed.createComponent(NouvelleClasse);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
