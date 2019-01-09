import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { BitcoinMarket, BitcoinPrice, CryptoCurrency } from 'src/models';

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

    public getAllCryptos(): Observable<CryptoCurrency[]> {
        return this.http.get('https://api.coinmarketcap.com/v1/ticker/')
        .pipe(
            map((data: any) => {
            return data.map((crypto: any) => {
                return new CryptoCurrency(crypto);
            });
        }));
    }

    public getBitcoinPriceStats(): Observable <BitcoinPrice> {
        return this.http.get('https://api.blockchain.info/charts/market-price?cors=true&format=json&lang=en')
        .pipe(
            map((data: any) => {
                return new BitcoinPrice(data);
            }));
    }
}
