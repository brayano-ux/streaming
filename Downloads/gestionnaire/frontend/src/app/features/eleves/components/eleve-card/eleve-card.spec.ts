import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EleveCard } from './eleve-card';

describe('EleveCard', () => {
  let component: EleveCard;
  let fixture: ComponentFixture<EleveCard>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EleveCard],
    }).compileComponents();

    fixture = TestBed.createComponent(EleveCard);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
