import { CryptoCurrency } from 'src/models/crypto-currency.class';
import { HttpClientModule } from '@angular/common/http';
import { TestBed, async } from '@angular/core/testing';
import { NO_ERRORS_SCHEMA } from '@angular/core';

import { CryptoFilterComponent } from './crypto-filter.component';
import { CryptoService } from 'src/services/crypto.service';

describe('CryptoFilterComponent', () => {

    beforeEach(async(() => {
        TestBed.configureTestingModule({
          declarations: [
            CryptoFilterComponent
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
        const fixture = TestBed.createComponent(CryptoFilterComponent);
        const app = fixture.debugElement.componentInstance;

        expect(app).toBeTruthy();   // the opposite of null or undefined
    }));

    it('default properties', async(() => {
        const fixture = TestBed.createComponent(CryptoFilterComponent);
        const app = fixture.debugElement.componentInstance;

        expect(app.filteredCryptos.length).toBe(0);
        expect(typeof app.filteredCryptos).toBe('object');
        expect(Array.isArray(app.filteredCryptos)).toBe(true);
        expect(app.percentChange).toBe('All');
        expect(app.showNumberOfCryptos).toBe(100);
        expect(app.priceUnit).toBe('USD');
    }));

    it('limit total cryptos', async(() => {
      // arrange
      const fixture = TestBed.createComponent(CryptoFilterComponent);
      const app = fixture.debugElement.componentInstance;
      app.filteredCryptos = Array(100).fill(new CryptoCurrency());
      app.showNumberOfCryptos = 25;

      // act
      app.showOnlyFilter();

      // assert
      expect(typeof app.filteredCryptos).toBe('object');
      expect(Array.isArray(app.filteredCryptos)).toBe(true);
      expect(app.filteredCryptos.length).toBe(25);

    }));

    it('retruns all cryptos', async(() => {
      // arrange
      const fixture = TestBed.createComponent(CryptoFilterComponent);
      const app = fixture.debugElement.componentInstance;
      app.cryptos = Array(100).fill(new CryptoCurrency());

      // act
      app.percentChangeFilter();

      // assert
      expect(app.filteredCryptos[0] instanceof CryptoCurrency);
      expect(app.filteredCryptos.length).toBe(100);
    }));

    it('returns positive 24h growth cryptos', async(() => {
      // arrange
      const fixture = TestBed.createComponent(CryptoFilterComponent);
      const app = fixture.debugElement.componentInstance;
      app.cryptos = [
        new CryptoCurrency({percent_change_24h: -1}),
        new CryptoCurrency({percent_change_24h: 6}),
        new CryptoCurrency({percent_change_24h: 5})
      ];
      app.percentChange = 'Positive';

      // act
      app.percentChangeFilter();

      // assert
      expect(app.filteredCryptos[0] instanceof CryptoCurrency);
      expect(app.filteredCryptos.length).toBe(2);

    }));

    it('returns negative 24h growth cryptos', async(() => {
      // arrange
      const fixture = TestBed.createComponent(CryptoFilterComponent);
      const app = fixture.debugElement.componentInstance;
      app.cryptos = [
        new CryptoCurrency({percent_change_24h: -1}),
        new CryptoCurrency({percent_change_24h: 6}),
        new CryptoCurrency({percent_change_24h: 5})
      ];
      app.percentChange = 'Negative';

      // act
      app.percentChangeFilter();

      // assert
      expect(app.filteredCryptos[0] instanceof CryptoCurrency);
      expect(app.filteredCryptos.length).toBe(1);

    }));
});
