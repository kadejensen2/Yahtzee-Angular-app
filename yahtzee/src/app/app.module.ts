import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { DieComponent } from './components/die/die.component';
import { HeaderComponent } from './components/header/header.component';
import { ButtonComponent } from './components/button/button.component';
import { rollService } from './rollService';
import { ScoreblockComponent } from './components/scoreblock/scoreblock.component';
import { ScorecardComponent } from './components/scorecard/scorecard.component';
import { diceValueService } from './diceValueService';
import { scoreService } from './scoreService';
import { totalScoreService } from './totalScoreService';
import { bonusScoreService } from './bonusScoreService';

@NgModule({
  declarations: [
    AppComponent,
    DieComponent,
    HeaderComponent,
    ButtonComponent,
    ScoreblockComponent,
    ScorecardComponent,


  ],
  imports: [
    BrowserModule,

  ],
  providers: [rollService,
              diceValueService,
            scoreService,totalScoreService,bonusScoreService],
  bootstrap: [AppComponent]
})
export class AppModule { }
