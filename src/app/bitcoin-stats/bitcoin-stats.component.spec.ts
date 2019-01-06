import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BitcoinStatsComponent } from './bitcoin-stats.component';

describe('BitcoinStatsComponent', () => {
  let component: BitcoinStatsComponent;
  let fixture: ComponentFixture<BitcoinStatsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BitcoinStatsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BitcoinStatsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
