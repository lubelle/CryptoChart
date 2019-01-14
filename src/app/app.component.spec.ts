import { HttpClientModule } from '@angular/common/http';
import { TestBed, async, ComponentFixture } from '@angular/core/testing';
import { NO_ERRORS_SCHEMA } from '@angular/core';

import { AppComponent } from './app.component';
import { CryptoService } from 'src/services/crypto.service';
import { BitcoinMarket } from 'src/models';
import { from } from 'rxjs';

describe('AppComponent', () => {
  let fixture: ComponentFixture<AppComponent>;
  let component;
  let service: CryptoService;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        AppComponent
      ],
      providers: [
        CryptoService
      ],
      imports: [
        HttpClientModule
      ],
      schemas: [NO_ERRORS_SCHEMA] // ignore the routeLink error in this case
    }).compileComponents();

    fixture = TestBed.createComponent(AppComponent);
    // component = fixture.debugElement.componentInstance;
    service = new CryptoService(null);
    component = new AppComponent(service);

  }));

  it('should create the app', async(() => {
    expect(component).toBeTruthy();
  }));

  it('instance of BitcoinMarket', async(() => {
    expect(component.bitcoinMarketCap instanceof BitcoinMarket).toBe(true);
  }));

  it('should set bitcoinMarketCap property with the data returned from the server', () => {
    // arrange
    const bitcoinMarket = new BitcoinMarket({totol_market_cap: 0});
    spyOn(service, 'getBitcoinmarketCap').and.callFake(() => {
      return from([bitcoinMarket]);
    });

    // act
    component.getBitcoinStats();

    // assert
    expect(component.bitcoinMarketCap).toBe(bitcoinMarket);
  });
});
