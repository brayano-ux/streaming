import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListeRecettes } from './liste-recettes';

describe('ListeRecettes', () => {
  let component: ListeRecettes;
  let fixture: ComponentFixture<ListeRecettes>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ListeRecettes],
    }).compileComponents();

    fixture = TestBed.createComponent(ListeRecettes);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
