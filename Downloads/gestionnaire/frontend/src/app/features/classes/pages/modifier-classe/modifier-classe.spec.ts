import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModifierClasse } from './modifier-classe';

describe('ModifierClasse', () => {
  let component: ModifierClasse;
  let fixture: ComponentFixture<ModifierClasse>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ModifierClasse],
    }).compileComponents();

    fixture = TestBed.createComponent(ModifierClasse);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
