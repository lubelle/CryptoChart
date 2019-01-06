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
    public top100Cryptos: CryptoCurrency[];
    constructor(public cryptoService: CryptoService) {
        this.getTop100Cryptos();
    }

    getTop100Cryptos(): void {
        this.cryptoService.getAllCryptos().subscribe( (data: any) => {
            this.top100Cryptos = data.map((ticker: any) => {
                return new CryptoCurrency(ticker);
            });
            console.log(this.top100Cryptos);
        });
    }
}
