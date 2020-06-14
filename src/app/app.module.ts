import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CasesComponent } from './core/cases/cases.component';

import { NgxChartsModule } from '@swimlane/ngx-charts';
import { CoronaBrService } from './core/services/coronabr.service';

@NgModule({
  declarations: [
    AppComponent,
    CasesComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    NgxChartsModule,
    HttpClientModule
  ],
  providers: [CoronaBrService],
  bootstrap: [AppComponent]
})
export class AppModule { }
