import { async, TestBed } from '@angular/core/testing';
import { HttpClientModule } from '@angular/common/http';
import { NO_ERRORS_SCHEMA } from '@angular/core';

import { CryptoTableComponent } from './crypto-table.component';
import { CryptoService } from 'src/services/crypto.service';
import { CryptoCurrency } from 'src/models';

describe('CryptoTableComponent', () => {
    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [CryptoTableComponent],
            providers: [CryptoService],
            imports: [HttpClientModule],
            schemas: [NO_ERRORS_SCHEMA]
        }).compileComponents();
    }));

    it('should create the component', () => {
        const fixture = TestBed.createComponent(CryptoTableComponent);
        const app = fixture.debugElement.componentInstance;

        expect(app).toBeTruthy();
    });

});
