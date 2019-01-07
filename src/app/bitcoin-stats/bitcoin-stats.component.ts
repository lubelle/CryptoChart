import { PriceCoordinates } from './../../models/price-coordinates.interface';
import { Component, OnInit } from '@angular/core';
import { CryptoService } from 'src/services/crypto.service';
import { BitcoinPrice } from 'src/models/bitcoin-price.class';

@Component({
  selector: 'app-bitcoin-stats',
  templateUrl: './bitcoin-stats.component.html',
  styleUrls: ['./bitcoin-stats.component.css']
})
export class BitcoinStatsComponent implements OnInit {
  bitcoinStats: BitcoinPrice = new BitcoinPrice();
  prices: number[];
  dates: string[];

  constructor(public cryptoService: CryptoService) { }

  ngOnInit() {
    this.getYearlyBitcoinPrice();
  }

  public getYearlyBitcoinPrice() {
    this.cryptoService.getBitcoinPriceStats().subscribe((data: any) => {
      this.bitcoinStats = new BitcoinPrice(data);
      this.prices = this.convertPrices();
      this.dates = this.convertDates();
      console.log(this.dates);
    });
  }

  // Here values returned from api are already sorted. If not, sort the string[] first then format
  // getMonth() function is zero indexed based
  // getDay: Day of the week (0-6) starting in sunday.
  // getTime: Number of milliseconds since January 1, 1970.
  convertDates(): string[] {
    const dates = this.bitcoinStats.values.map((coordinates: PriceCoordinates) => {
      const rawDate = new Date(coordinates.x * 1000);

      return `${rawDate.getMonth() + 1}/${rawDate.getDate()}/${rawDate.getFullYear()}`;
    });
    return dates;
  }

  public convertPrices(): number[] {
    // filter out all the values that are in our values right for prices and 
    // put them into an array of prices
    const prices = this.bitcoinStats.values.map((coordinates: PriceCoordinates) => {
      return Number((coordinates.y).toFixed(2));
    });
    return prices;
  }
}
