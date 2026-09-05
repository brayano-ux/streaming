import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NouvelEmploi } from './nouvel-emploi';

describe('NouvelEmploi', () => {
  let component: NouvelEmploi;
  let fixture: ComponentFixture<NouvelEmploi>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NouvelEmploi],
    }).compileComponents();

    fixture = TestBed.createComponent(NouvelEmploi);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
