import { NO_ERRORS_SCHEMA } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { TestBed, async, ComponentFixture } from '@angular/core/testing';

import { CryptoCurrency } from 'src/models';
import { CryptoFilterComponent } from './crypto-filter.component';
import { CryptoService } from 'src/services/crypto.service';

describe('CryptoFilterComponent', () => {
    let fixture: ComponentFixture<CryptoFilterComponent>;
    let component;

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

        fixture = TestBed.createComponent(CryptoFilterComponent);
        component = fixture.debugElement.componentInstance;
    }));

    it('should create the component', async(() => {
        expect(component).toBeTruthy();   // the opposite of null or undefined
    }));

    it('default properties', async(() => {
        expect(component.filteredCryptos.length).toBe(0);
        expect(typeof component.filteredCryptos).toBe('object');
        expect(Array.isArray(component.filteredCryptos)).toBe(true);
        expect(component.percentChange).toBe('All');
        expect(component.showNumberOfCryptos).toBe(100);
        expect(component.priceUnit).toBe('USD');
    }));

    it('limit total cryptos', async(() => {
      // arrange
      component.filteredCryptos = Array(100).fill(new CryptoCurrency());
      component.showNumberOfCryptos = 25;

      // act
      component.showOnlyFilter();

      // assert
      expect(typeof component.filteredCryptos).toBe('object');
      expect(Array.isArray(component.filteredCryptos)).toBe(true);
      expect(component.filteredCryptos.length).toBe(25);

    }));

    it('retruns all cryptos', async(() => {
      // arrange
      component.cryptos = Array(100).fill(new CryptoCurrency());

      // act
      component.percentChangeFilter();

      // assert
      expect(component.filteredCryptos[0] instanceof CryptoCurrency);
      expect(component.filteredCryptos.length).toBe(100);
    }));

    it('returns positive 24h growth cryptos', async(() => {
      // arrange
      component.cryptos = [
        new CryptoCurrency({percent_change_24h: -1}),
        new CryptoCurrency({percent_change_24h: 6}),
        new CryptoCurrency({percent_change_24h: 5})
      ];
      component.percentChange = 'Positive';

      // act
      component.percentChangeFilter();

      // assert
      expect(component.filteredCryptos[0] instanceof CryptoCurrency);
      expect(component.filteredCryptos.length).toBe(2);

    }));

    it('returns negative 24h growth cryptos', async(() => {
      // arrange
      component.cryptos = [
        new CryptoCurrency({percent_change_24h: -1}),
        new CryptoCurrency({percent_change_24h: 6}),
        new CryptoCurrency({percent_change_24h: 5})
      ];
      component.percentChange = 'Negative';

      // act
      component.percentChangeFilter();

      // assert
      expect(component.filteredCryptos[0] instanceof CryptoCurrency);
      expect(component.filteredCryptos.length).toBe(1);

    }));
});
