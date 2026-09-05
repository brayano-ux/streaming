import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModifierEnseignant } from './modifier-enseignant';

describe('ModifierEnseignant', () => {
  let component: ModifierEnseignant;
  let fixture: ComponentFixture<ModifierEnseignant>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ModifierEnseignant],
    }).compileComponents();

    fixture = TestBed.createComponent(ModifierEnseignant);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
