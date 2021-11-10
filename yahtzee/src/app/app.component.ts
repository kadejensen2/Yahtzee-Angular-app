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
  rules=false

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
        console.log("You have earned a Yahtzee chip")
        this.bonusYahtzeeTokens += 1
        this.YbonusAwarded=true
      }
      if (((parseInt(m)%parseInt(m)==0)||(parseInt(m)==0))&&(this.count<6)){
        this.bonusScore += parseInt(m)
        this.count +=1
        if(!(this.bonusAwarded)&&(this.bonusScore>=63)){
          this.bonusAwarded=true
          console.log("Total of number section: ",this.bonusScore, "You have scored enough points for the bonus")
          this._totalScoreService.filterTSco("35")
          this.turn -=1
        }
      }
    })
  }

  emitRoll(){
    this._rollService.filter('roll clicked');
  }

  Turn(){
    this.turn +=1
    if (this.turn==14){
      this.gameOver = true
      this.chips = this.bonusYahtzeeTokens*100
      console.log("You have", this.bonusYahtzeeTokens, "yahtzee chips")
      this._totalScoreService.filterTSco((this.chips))
    }
  }

  Rules(){
    this.rules=!this.rules
  }

  restart(){
    window.location.reload()
  }

}
