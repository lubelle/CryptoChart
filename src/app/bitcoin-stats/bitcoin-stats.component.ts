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

  constructor(public cryptoService: CryptoService) { }

  ngOnInit() {
    this.getYearlyBitcoinPrice();
  }

  public getYearlyBitcoinPrice() {
    this.cryptoService.getBitcoinPriceStats().subscribe((data: any) => {
      this.bitcoinStats = new BitcoinPrice(data);
      this.prices = this.convertPrices();
      console.log(this.prices);
    });
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
