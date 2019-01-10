import { NO_ERRORS_SCHEMA } from '@angular/core';
import { TestBed, async } from '@angular/core/testing';
import { HttpClientModule } from '@angular/common/http';

import { CryptoService } from './../../services/crypto.service';
import { BitcoinStatsComponent } from './bitcoin-stats.component';
import { BitcoinPrice } from '../../models';

describe('BitcoinStatsComponent', () => {
    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [BitcoinStatsComponent],
            providers: [CryptoService],
            imports: [HttpClientModule],
            schemas: [NO_ERRORS_SCHEMA]
        }).compileComponents();
    }));

    it('should create the component', async(() => {
        const fixture = TestBed.createComponent(BitcoinStatsComponent);
        const app = fixture.debugElement.componentInstance;

        expect(app).toBeTruthy();
    }));

    it('instance of BitcoinPrice', async(() => {
        const fixture = TestBed.createComponent(BitcoinStatsComponent);
        const app = fixture.debugElement.componentInstance;

        expect(app.bitcoinStats instanceof BitcoinPrice).toBe(true);
    }));

    it('function convertDates() should return string []', async(() => {
        const fixture = TestBed.createComponent(BitcoinStatsComponent);
        const app = fixture.debugElement.componentInstance;
        app.bitcoinStats.values = [
            {x: 1515542400 , y: 15126.398333333333},
            {x: 1515628800, y: 13296.794}
        ];

        const result = app.convertDates();

        expect(typeof result[0]).toBe('string');
    }));

    it('function convertPrices() should return number []', async(() => {
        const fixture = TestBed.createComponent(BitcoinStatsComponent);
        const app = fixture.debugElement.componentInstance;
        app.bitcoinStats.values = [
            {x: 1515542400 , y: 15126.398333333333},
            {x: 1515628800, y: 13296.794}
        ];

        const result = app.convertPrices();

        expect(typeof result[0]).toBe('number');
    }));
});
