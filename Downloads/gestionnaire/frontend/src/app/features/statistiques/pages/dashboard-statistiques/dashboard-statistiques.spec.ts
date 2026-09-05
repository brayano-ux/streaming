import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DashboardStatistiques } from './dashboard-statistiques';

describe('DashboardStatistiques', () => {
  let component: DashboardStatistiques;
  let fixture: ComponentFixture<DashboardStatistiques>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DashboardStatistiques],
    }).compileComponents();

    fixture = TestBed.createComponent(DashboardStatistiques);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
