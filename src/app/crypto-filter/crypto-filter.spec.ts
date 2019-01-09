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

});
