import { CryptoCurrency } from './../../models/crypto-currency.class';
import { async, TestBed, ComponentFixture } from '@angular/core/testing';
import { HttpClientModule } from '@angular/common/http';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { from } from 'rxjs';

import { CryptoTableComponent } from './crypto-table.component';
import { CryptoService } from 'src/services/crypto.service';

describe('CryptoTableComponent', () => {
    let fixture: ComponentFixture<CryptoTableComponent>;
    let component;
    let service: CryptoService;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [CryptoTableComponent],
            providers: [CryptoService],
            imports: [HttpClientModule],
            schemas: [NO_ERRORS_SCHEMA]
        }).compileComponents();

        fixture = TestBed.createComponent(CryptoTableComponent);
        service = new CryptoService(null);
        // component = fixture.debugElement.componentInstance;
        component = new CryptoTableComponent(service);
    }));

    it('should create the component', () => {
        expect(component).toBeTruthy();
    });

    it('should return supported currency USD', () => {
        component.listenPriceUnit('USD');
        expect(component.priceUnit).toContain('USD');
    });

    it('should return supported currency BTC', () => {
        component.listenPriceUnit('BTC');
        expect(component.priceUnit).toContain('BTC');
    });

    it('should set top100Cryptos property with the data returned from the server', () => {
        // arrange
        const cryptos: CryptoCurrency[] = [new CryptoCurrency()];
        spyOn(service, 'getAllCryptos').and.callFake(() => {
            return from([cryptos]);
        });

        // act
        component.getTop100Cryptos();

        // assert
        expect(component.top100Cryptos.length).toBe(1);
    });

});
