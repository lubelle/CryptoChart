import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { CryptoService } from 'src/services/crypto.service';
import { BitcoinMarket } from 'src/models';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit, OnDestroy {

  public bitcoinMarketCap: BitcoinMarket = new BitcoinMarket();
  bitcoinmarketCapSub: Subscription;

  constructor(public cryptoService: CryptoService) {}

  ngOnInit(): void {
    this.getBitcoinStats();
  }

  ngOnDestroy(): void {
    this.bitcoinmarketCapSub.unsubscribe();
  }

  public getBitcoinStats(): void {

    this.bitcoinmarketCapSub = this.cryptoService.getBitcoinmarketCap().subscribe((data: BitcoinMarket) => {
      this.bitcoinMarketCap = data;
    });

  }

}
