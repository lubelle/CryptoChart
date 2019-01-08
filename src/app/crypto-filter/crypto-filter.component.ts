import { Component, Input, Output } from '@angular/core';
import { EventEmitter } from 'events';

import { CryptoCurrency } from 'src/models/crypto-currency.class';
import { ThrowStmt } from '@angular/compiler';

@Component({
    selector: 'app-crypto-filter',
    templateUrl: './crypto-filter.component.html',
    styleUrls: ['./crypto-filter.component.css']
})
export class CryptoFilterComponent {
    @Input() cryptos: CryptoCurrency[];
    filteredCryptos: CryptoCurrency[];
    percentChange = 'All';

    // in the template: <select id="growth" class="form-control" [(ngModel)]="percentChange" (ngModelChange)="percentChangeFilter()">
    // the order of ngModel and ngModelChange matters

    percentChangeFilter(): void {
        this.filteredCryptos = this.cryptos.filter((crypto: CryptoCurrency) => {
            if (this.percentChange === 'Positive') {
                return crypto.percent_change_24h >= 0;
            } else if (this.percentChange === 'Negative') {
                return crypto.percent_change_24h < 0;
            }
            return this.cryptos;
        });
    }

}
