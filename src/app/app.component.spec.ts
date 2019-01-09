import { HttpClientModule } from '@angular/common/http';
import { TestBed, async } from '@angular/core/testing';
import { AppComponent } from './app.component';
import { NO_ERRORS_SCHEMA } from '@angular/core';

import { CryptoService } from 'src/services/crypto.service';
import { BitcoinMarket } from 'src/models';

describe('AppComponent', () => {

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
  }));

  it('should create the app', async(() => {
    // arrange
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.debugElement.componentInstance;

    // no act in this case just assert
    expect(app).toBeTruthy();
  }));

  it('instance of BitcoinMarket', async(() => {
    // arrange
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.debugElement.componentInstance;

    // assert
    expect(app.bitcoinMarketCap instanceof BitcoinMarket).toBe(true);
  }));
});
