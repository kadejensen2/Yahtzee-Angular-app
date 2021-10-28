import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { diceValueService } from 'src/app/diceValueService';
import { rollService } from 'src/app/rollService';
import { scoreService } from 'src/app/scoreService';



@Component({
  selector: 'app-scoreblock',
  templateUrl: './scoreblock.component.html',
  styleUrls: ['./scoreblock.component.css']
})
export class ScoreblockComponent implements OnInit {
  @Input() name!: string;
  @Output() scored: EventEmitter <any> = new EventEmitter()
  value:any = null
  category! : string;
  diceValues=[0,0,0,0,0]
  countRolls=0
  count=0
  index=0
  constructor(private _scoreService:scoreService,private _rollService: rollService,private _diceValueService: diceValueService){

    this._diceValueService.listenDie().subscribe((m:any) => {

      if ((parseInt(m)%parseInt(m)==0)) {// diceValues is updated every roll
        this.diceValues[this.index%5]=m
        this.index++
        //console.log(this.diceValues)
      }
    })


    this._scoreService.listenSco().subscribe((m:any) =>{
      if (parseInt(m)%parseInt(m)==0){
        for (let i = 0; i <= 4; i++) {

          this.diceValues[i]=m.substring(i,i+1)

        }
        console.log(this.diceValues)
      }
    })



  }

  score(x :any){
    this.category = x


    console.log(x)
    //this.diceValues=[ 1,1,1,1,1] // use to change dice to values i want to check scoring logic
    this.checkDie()
    this._rollService.filter("reset")

  }


  addPoints(){
    if (this.category == "Full House"){
      this.value = 25
    }
    if (this.category == "Small Straight"){
      this.value = 30
    }
    if (this.category == "Large Straight"){
      this.value = 40
    }
    if (this.category == "Yahtzee"){
      this.value = 50
    }

  }

  checkDie(){
    let count=0
    switch(this.name) {
      case "1s":
      count=0
        for (let i = 0; i < this.diceValues.length; i++){
          if(this.diceValues[i]==1){
            count++
          }
        }
        this.value=(count*1)
        console.log("count of", count)
        break;
      case "2s":
        count=0
        for (let i = 0; i < this.diceValues.length; i++){
          if(this.diceValues[i]==2){
            count++
          }
        }
        console.log("count of", count)
        this.value=(count*2)
        break;
      case "3s":
        count=0
        for (let i = 0; i < this.diceValues.length; i++){
          if(this.diceValues[i]==3){
            count++
          }
        }
        console.log("count of", count)
        this.value=(count*3)
        break;
      case "4s":
        count=0
        for (let i = 0; i < this.diceValues.length; i++){
          if(this.diceValues[i]==4){
            count++
          }
        }
        console.log("count of", count)
        this.value=(count*4)
        break;
      case "5s":
        count=0
        for (let i = 0; i < this.diceValues.length; i++){
          if(this.diceValues[i]==5){
            count++
          }
        }
        console.log("count of", count)
        this.value=(count*5)
        break;
      case "6s":
        count=0
        for (let i = 0; i < this.diceValues.length; i++){
          if(this.diceValues[i]==6){
            count++
          }
        }
        console.log("count of", count)
        this.value=(count*6)
        break;
      case "Yahtzee":
        if(((this.diceValues[0] ==this.diceValues[1] )&&(this.diceValues[2] ==this.diceValues[3] ))&&
        ((this.diceValues[0] ==this.diceValues[4] )&&(this.diceValues[0] ==this.diceValues[2]))){
        this.value=50
      }
        break;

      default:
        // code block
    }
    return true
  }
  pr(){ //temp
    console.log(this.diceValues,"in print")
  }

  ngOnInit(): void {
  }

}
