import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';

import { AppComponent } from './app.component';
import { CryptoService } from 'src/services/crypto.service';
import { CryptoTableComponent } from './crypto-table/crypto-table.component';

@NgModule({
  declarations: [
    AppComponent,
    CryptoTableComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule
  ],
  providers: [CryptoService],
  bootstrap: [AppComponent]
})
export class AppModule { }
