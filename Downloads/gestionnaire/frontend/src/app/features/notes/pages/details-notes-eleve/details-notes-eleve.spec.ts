import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DetailsNotesEleve } from './details-notes-eleve';

describe('DetailsNotesEleve', () => {
  let component: DetailsNotesEleve;
  let fixture: ComponentFixture<DetailsNotesEleve>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DetailsNotesEleve],
    }).compileComponents();

    fixture = TestBed.createComponent(DetailsNotesEleve);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
