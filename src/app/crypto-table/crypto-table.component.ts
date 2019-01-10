import { Component } from '@angular/core';
import { CryptoService } from 'src/services/crypto.service';
import { CryptoCurrency, sortValues } from 'src/models';

@Component({
    selector: 'app-crypto-table',
    templateUrl: './crypto-table.component.html',
    styleUrls: ['./crypto-table.component.css']
})
export class CryptoTableComponent {
    public top100Cryptos: CryptoCurrency[];
    filteredCryptos: CryptoCurrency[];
    priceUnit = 'USD';
    public sortValues: any = sortValues;
    constructor(public cryptoService: CryptoService) {
        this.getTop100Cryptos();
    }

    listenFilterCryptos(arr: CryptoCurrency[]) {
        this.filteredCryptos = arr;
    }

    listenPriceUnit(e: string) {
        this.priceUnit = e;
        console.log(this.priceUnit);
    }
    getTop100Cryptos(): void {
        this.cryptoService.getAllCryptos().subscribe( (data: CryptoCurrency[]) => {
            this.top100Cryptos = data;
            this.filteredCryptos = this.top100Cryptos;
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
