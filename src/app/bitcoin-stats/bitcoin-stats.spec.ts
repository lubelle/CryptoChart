import { NO_ERRORS_SCHEMA } from '@angular/core';
import { TestBed, async, ComponentFixture } from '@angular/core/testing';
import { HttpClientModule } from '@angular/common/http';

import { CryptoService } from './../../services/crypto.service';
import { BitcoinStatsComponent } from './bitcoin-stats.component';
import { BitcoinPrice } from '../../models';

describe('BitcoinStatsComponent', () => {
    let fixture: ComponentFixture<BitcoinStatsComponent>;
    let component;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [BitcoinStatsComponent],
            providers: [CryptoService],
            imports: [HttpClientModule],
            schemas: [NO_ERRORS_SCHEMA]
        }).compileComponents();

        fixture = TestBed.createComponent(BitcoinStatsComponent);
        component = fixture.debugElement.componentInstance;
    }));

    it('should create the component', async(() => {
        expect(component).toBeTruthy();
    }));

    it('instance of BitcoinPrice', async(() => {
        expect(component.bitcoinStats instanceof BitcoinPrice).toBe(true);
    }));

    it('should return string []', async(() => {
        component.bitcoinStats.values = [
            {x: 1515542400 , y: 15126.398333333333},
            {x: 1515628800, y: 13296.794}
        ];

        const result = component.convertDates();

        expect(typeof result[0]).toBe('string');
        expect(result.length).toBe(2);
    }));

    it('should return number []', async(() => {
        component.bitcoinStats.values = [
            {x: 1515542400 , y: 15126.398333333333},
            {x: 1515628800, y: 13296.794}
        ];

        const result = component.convertPrices();

        expect(typeof result[0]).toBe('number');
        expect(result.length).toBe(2);
    }));
});
