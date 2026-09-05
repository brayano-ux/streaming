import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NouvelEleve } from './nouvel-eleve';

describe('NouvelEleve', () => {
  let component: NouvelEleve;
  let fixture: ComponentFixture<NouvelEleve>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NouvelEleve],
    }).compileComponents();

    fixture = TestBed.createComponent(NouvelEleve);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
