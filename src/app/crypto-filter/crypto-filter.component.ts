import { Component, Input } from '@angular/core';

import { CryptoCurrency } from 'src/models/crypto-currency.class';

@Component({
    selector: 'app-crypto-filter',
    templateUrl: './crypto-filter.component.html',
    styleUrls: ['./crypto-filter.component.css']
})
export class CryptoFilterComponent {
    @Input() cryptos: CryptoCurrency[];
    filteredCryptos: CryptoCurrency[];
    percentChange = 'All';
    showNumberOfCryptos = 100;

    // in the template: <select id="growth" class="form-control" [(ngModel)]="percentChange" (ngModelChange)="percentChangeFilter()">
    // the order of ngModel and ngModelChange matters

    cryptosFilter(): void {
        this.percentChangeFilter();
        this.showOnlyFilter();
    }

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

    showOnlyFilter(): void {
        this.filteredCryptos = this.cryptos.slice(0, this.showNumberOfCryptos);
    }
}
