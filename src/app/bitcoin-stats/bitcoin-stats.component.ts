import { Component, OnInit } from '@angular/core';
import { CryptoService } from 'src/services/crypto.service';
import { PriceCoordinates, BitcoinPrice } from 'src/models';

@Component({
  selector: 'app-bitcoin-stats',
  templateUrl: './bitcoin-stats.component.html',
  styleUrls: ['./bitcoin-stats.component.css']
})
export class BitcoinStatsComponent implements OnInit {
  bitcoinStats: BitcoinPrice = new BitcoinPrice();
  prices: number[];
  dates: string[];
  options: any;
  chartData: any;

  constructor(public cryptoService: CryptoService) {}

  ngOnInit() {
    this.getYearlyBitcoinPrice();
  }

  public getYearlyBitcoinPrice() {
    this.cryptoService.getBitcoinPriceStats().subscribe((data: BitcoinPrice) => {
      this.bitcoinStats = data;
      this.prices = this.convertPrices();
      this.dates = this.convertDates();
      this.chartData = {
        labels: this.dates,
        datasets: [
          {
            label: `Bitcoin (${this.bitcoinStats.unit})`,
            data: this.prices,
            backgroundColor: 'rgba(0, 0, 0, .5)',
            borderColor: '#6699f6'
          }
        ]
      };
      this.options = {
        legend: {
          labels: { fontColor: 'white'}
        },
        scales: {
          xAxes: [{
            gridLines: {
                color: 'rgba(255, 255, 255, 0.3)'
            }
          }],
          yAxes: [{
              gridLines: {
                  color: 'rgba(255, 255, 255, 0.3)'
              }
          }]
        },
        responsive: true,
        maintainAspectRatio: false
      };
    });
  }

  // Here values returned from api are already sorted. If not, sort the string[] first then format
  // getMonth() function is zero indexed based
  // getDay: Day of the week (0-6) starting in sunday.
  // getTime: Number of milliseconds since January 1, 1970.
  convertDates(): string[] {
    const dates = this.bitcoinStats.values.map(
      (coordinates: PriceCoordinates) => {
        const rawDate = new Date(coordinates.x * 1000);

        return `${rawDate.getMonth() +
          1}/${rawDate.getDate()}/${rawDate.getFullYear()}`;
      }
    );
    return dates;
  }

  public convertPrices(): number[] {
    // filter out all the values that are in our values right for prices and
    // put them into an array of prices
    const prices = this.bitcoinStats.values.map(
      (coordinates: PriceCoordinates) => {
        return Number(coordinates.y.toFixed(2));
      }
    );
    return prices;
  }
}
