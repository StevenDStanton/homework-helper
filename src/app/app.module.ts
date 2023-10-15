import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SpellingComponent } from './spelling/spelling.component';
import { MathComponent } from './math/math.component';
import { LayoutComponent } from './layout/layout.component';

import { FormsModule } from '@angular/forms';
import { WordSearchComponent } from './games/word-search/word-search.component';


@NgModule({
  declarations: [
    AppComponent,
    SpellingComponent,
    MathComponent,
    LayoutComponent,
    WordSearchComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
