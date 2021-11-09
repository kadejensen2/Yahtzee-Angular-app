import { Component } from '@angular/core';
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
  YbonusAwarded =false
  countRolls=0
  count=0
  bonusYahtzeeTokens=0
  turn=1
  chips: any
  gameOver= false

  constructor(private _rollService: rollService,private _totalScoreService: totalScoreService,private _bonusScoreService:bonusScoreService){

    this._rollService.listen().subscribe((m:any) => {
      if ((m =="roll clicked")&&(this.countRolls<=2)) {
        this.countRolls++
      }
      if (m=="reset"){
        this.countRolls=0
      }
    })

    this._totalScoreService.listenTSco().subscribe((m: any) => {
      this.totalScore += parseInt(m)
      console.log("Adding",m,"points to total")
      this.Turn()
    })

    this._bonusScoreService.listenBSco().subscribe((m:any) =>{
      if (m=="bonusYahtzee"){
              this.bonusYahtzeeTokens += 1
              this.YbonusAwarded=true
            }

      //console.log("first",m)
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

  Turn(){
    this.turn +=1
    if (this.turn==14){
      this.gameOver = true
      this.chips = this.bonusYahtzeeTokens*100
      this._totalScoreService.filterTSco((this.chips))
    }
  }


restart(){
  window.location.reload()
}

}
