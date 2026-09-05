import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModifierEleve } from './modifier-eleve';

describe('ModifierEleve', () => {
  let component: ModifierEleve;
  let fixture: ComponentFixture<ModifierEleve>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ModifierEleve],
    }).compileComponents();

    fixture = TestBed.createComponent(ModifierEleve);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
