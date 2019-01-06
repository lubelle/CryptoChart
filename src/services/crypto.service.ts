import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Observable, pipe } from 'rxjs';
import { map } from 'rxjs/operators';
import { BitcoinMarket } from 'src/models/bitcoin-market.class';
import { CryptoCurrency } from 'src/models/crypto-currency.class';

@Injectable()
export class CryptoService {
    constructor(public http: HttpClient) {}

    public getBitcoinmarketCap(): Observable <BitcoinMarket> {
        return this.http.get('https://api.coinmarketcap.com/v2/global/')
        .pipe(
            map((data: any) => {
                return new BitcoinMarket(data);
        }));
    }

    public getAllCryptos() {
        return this.http.get('https://api.coinmarketcap.com/v1/ticker/');
    }
}
