import { Component, EventEmitter, Output } from '@angular/core';
import { rollService } from './rollService';
import { totalScoreService } from './totalScoreService';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'yahtzee';
  totalScore = 0
  @Output() rolled: EventEmitter <any> = new EventEmitter()

  constructor(private _rollService: rollService,private _totalScoreService: totalScoreService){


    this._totalScoreService.listenTSco().subscribe((m: any) => {
      this.totalScore += parseInt(m)
      console.log("Adding",m,"points to total")

    })


  }


  emitRoll(){ //emit to roll function
    this._rollService.filter('roll clicked');
  }





}
