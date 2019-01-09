import { Component, Input, Output, EventEmitter, AfterViewInit } from '@angular/core';
import { CryptoCurrency } from 'src/models/crypto-currency.class';

@Component({
    selector: 'app-crypto-filter',
    templateUrl: './crypto-filter.component.html',
    styleUrls: ['./crypto-filter.component.css']
})
export class CryptoFilterComponent {
    @Input() cryptos: CryptoCurrency[];
    @Output() filteredCryptosEvent = new EventEmitter<CryptoCurrency[]>();
    @Output() priceUnitEvent = new EventEmitter<string>();
    filteredCryptos: CryptoCurrency[];
    percentChange = 'All';
    showNumberOfCryptos = 100;
    priceUnit = 'USD';

    filterEvent() {
        this.filteredCryptosEvent.emit(this.filteredCryptos);
    }

    priceEvent() {
        this.priceUnitEvent.emit(this.priceUnit);
    }

    // in the template: <select id="growth" class="form-control" [(ngModel)]="percentChange" (ngModelChange)="percentChangeFilter()">
    // the order of ngModel and ngModelChange matters
    percentChangeFilter(): void {
        this.filteredCryptos = this.cryptos.filter((crypto: CryptoCurrency) => {
            if (this.percentChange === 'Positive') {
                return crypto.percent_change_24h >= 0;
            } else if (this.percentChange === 'Negative') {
                return crypto.percent_change_24h < 0;
            }
            return crypto;
        });
        console.log(this.filteredCryptos);
    }

    showOnlyFilter(): void {
        this.filteredCryptos = this.cryptos.slice(0, this.showNumberOfCryptos);
        console.log(this.filteredCryptos);

        this.filterEvent();
        this.priceEvent();

    }

    cryptosFilter(): void {
        this.percentChangeFilter();
        this.showOnlyFilter();

    }
}
