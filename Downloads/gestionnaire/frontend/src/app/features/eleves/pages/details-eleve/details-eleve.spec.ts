import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DetailsEleve } from './details-eleve';

describe('DetailsEleve', () => {
  let component: DetailsEleve;
  let fixture: ComponentFixture<DetailsEleve>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DetailsEleve],
    }).compileComponents();

    fixture = TestBed.createComponent(DetailsEleve);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
