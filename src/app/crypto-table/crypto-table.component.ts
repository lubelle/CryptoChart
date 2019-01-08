import { element } from 'protractor';
import { Component } from '@angular/core';
import { CryptoService } from 'src/services/crypto.service';
import { CryptoCurrency } from 'src/models/crypto-currency.class';

@Component({
    selector: 'app-crypto-table',
    templateUrl: './crypto-table.component.html',
    styleUrls: ['./crypto-table.component.css']
})
export class CryptoTableComponent {
    isToggle = false;
    public top100Cryptos: CryptoCurrency[];
    public sortValues: any = { rank: false, market_cap_usd: true, available_supply: false,
                               percent_change_24h: false, price_usd: false, name: false};
    constructor(public cryptoService: CryptoService) {
        this.getTop100Cryptos();
    }

    getTop100Cryptos(): void {
        this.cryptoService.getAllCryptos().subscribe( (data: any) => {
            this.top100Cryptos = data.map((ticker: any) => {
                return new CryptoCurrency(ticker);
            });
        });
    }
    sortString(sortValue: boolean, key?: string): void {
        if (sortValue) {
            this.top100Cryptos = this.top100Cryptos.sort((a, b) => {
                const nameA = a.name.toUpperCase();
                const nameB = b.name.toUpperCase();
                if (nameA < nameB) {
                    return -1;
                } else if (nameA > nameB) {
                    return 1;
                }
                return 0;
            });
        } else {
            this.top100Cryptos = this.top100Cryptos.sort((a, b) => {
                const nameA = a.name.toUpperCase();
                const nameB = b.name.toUpperCase();
                if (nameA > nameB) {
                    return -1;
                } else if (nameA < nameB) {
                    return 1;
                }
                return 0;
            });
        }
    }
    public sortNumeric(sortValue: string, key: string) {
        if (sortValue) {
            this.top100Cryptos = this.top100Cryptos.sort((a: CryptoCurrency, b: CryptoCurrency) => {
                return a[key] - b[key];
            });
        } else {
            this.top100Cryptos = this.top100Cryptos.sort((a: CryptoCurrency, b: CryptoCurrency) => {
                return b[key] - a[key];
            });
        }
    }
}
