import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SpellingComponent } from './spelling/spelling.component';
import { MathComponent } from './math/math.component';

@NgModule({
  declarations: [
    AppComponent,
    SpellingComponent,
    MathComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
