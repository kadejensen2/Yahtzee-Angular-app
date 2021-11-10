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

    this._rollService.listen().subscribe((message:any) => { // counts rolls
      if ((message =="roll clicked")&&(this.countRolls<=2)) {
        this.countRolls++
      }
      if (message=="reset"){
        this.countRolls=0
      }
    })

    this._totalScoreService.listenTSco().subscribe((message: any) => {// adds points to the total score and increments the turn
      this.totalScore += parseInt(message)
      console.log("Adding",message,"points to total")
      this.Turn()
    })

    this._bonusScoreService.listenBSco().subscribe((message:any) =>{//recieving signals for bonus scoring
      if (message=="bonusYahtzee"){//adding a bonus chip if award
        console.log("You have earned a Yahtzee chip")
        this.bonusYahtzeeTokens += 1
        this.YbonusAwarded=true
      }
      if (((parseInt(message)%parseInt(message)==0)||(parseInt(message)==0))&&(this.count<6)){// adding up the first 6 signals(the number section)
        this.bonusScore += parseInt(message)
        this.count +=1
        if(!(this.bonusAwarded)&&(this.bonusScore>=63)){//checking if it is over 63 and giving bonus
          this.bonusAwarded=true
          console.log("Total of number section: ",this.bonusScore, "You have scored enough points for the bonus")
          this._totalScoreService.filterTSco("35")
          this.turn -=1
        }
      }
    })
  }

  emitRoll(){//sends a message that the roll button was clicked
    this._rollService.filter('roll clicked');
  }

  Turn(){// function to increment the turn counter and end the game after turn 13
    this.turn +=1
    if (this.turn==14){
      this.gameOver = true
      this.chips = this.bonusYahtzeeTokens*100
      console.log("You have", this.bonusYahtzeeTokens, "yahtzee chips")
      this._totalScoreService.filterTSco((this.chips))
    }
  }

  Rules(){ //toggles the rules so they can be shown or not
    this.rules=!this.rules
  }

  restart(){//refesh the page to restart the game
    window.location.reload()
  }

}
