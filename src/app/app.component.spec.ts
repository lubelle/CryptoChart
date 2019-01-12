import { HttpClientModule } from '@angular/common/http';
import { TestBed, async, ComponentFixture } from '@angular/core/testing';
import { NO_ERRORS_SCHEMA } from '@angular/core';

import { AppComponent } from './app.component';
import { CryptoService } from 'src/services/crypto.service';
import { BitcoinMarket } from 'src/models';

describe('AppComponent', () => {
  let fixture: ComponentFixture<AppComponent>;
  let component;

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
    component = fixture.debugElement.componentInstance;

  }));

  it('should create the app', async(() => {
    expect(component).toBeTruthy();
  }));

  it('instance of BitcoinMarket', async(() => {
    expect(component.bitcoinMarketCap instanceof BitcoinMarket).toBe(true);
  }));
});
