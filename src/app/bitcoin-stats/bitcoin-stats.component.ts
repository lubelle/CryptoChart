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
  constructor(public cryptoService: CryptoService) { }

  ngOnInit() {
    this.getYearlyBitcoinPrice();
  }

  public getYearlyBitcoinPrice() {
    this.cryptoService.getBitcoinPriceStats().subscribe((data: any) => {
      this.bitcoinStats = new BitcoinPrice(data);
    });
  }

}
