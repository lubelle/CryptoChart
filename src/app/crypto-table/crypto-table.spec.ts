import { async, TestBed, ComponentFixture } from '@angular/core/testing';
import { HttpClientModule } from '@angular/common/http';
import { NO_ERRORS_SCHEMA } from '@angular/core';

import { CryptoTableComponent } from './crypto-table.component';
import { CryptoService } from 'src/services/crypto.service';

describe('CryptoTableComponent', () => {
    let fixture: ComponentFixture<CryptoTableComponent>;
    let component;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [CryptoTableComponent],
            providers: [CryptoService],
            imports: [HttpClientModule],
            schemas: [NO_ERRORS_SCHEMA]
        }).compileComponents();

        fixture = TestBed.createComponent(CryptoTableComponent);
        component = fixture.debugElement.componentInstance;
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

});
