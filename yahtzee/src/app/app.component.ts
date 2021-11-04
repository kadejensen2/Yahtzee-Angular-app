import { Component, EventEmitter, Output } from '@angular/core';
import { bonusScoreService } from './bonusScoreService';
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
  bonusScore = 0
  bonusAwarded =false
  count=0
  @Output() rolled: EventEmitter <any> = new EventEmitter()

  constructor(private _rollService: rollService,private _totalScoreService: totalScoreService,private _bonusScoreService:bonusScoreService){


    this._totalScoreService.listenTSco().subscribe((m: any) => {
      this.totalScore += parseInt(m)
      console.log("Adding",m,"points to total")

    })
    this._bonusScoreService.listenBSco().subscribe((m:any) =>{

      console.log("first",m)
      if (((parseInt(m)%parseInt(m)==0)||(parseInt(m)==0))&&(this.count<6)){
        this.bonusScore += parseInt(m)
        console.log("bonus update: ",this.bonusScore,this.count)
        this.count +=1
        //console.log(" in if m=", m)
          if(!(this.bonusAwarded)&&(this.bonusScore>=63)){
            this._totalScoreService.filterTSco("35")
            this.bonusAwarded=true}



        }

    })


  }


  emitRoll(){ //emit to roll function
    this._rollService.filter('roll clicked');
  }





}
