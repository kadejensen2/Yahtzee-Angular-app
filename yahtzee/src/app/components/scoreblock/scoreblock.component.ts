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
  constructor(private _scoreService:scoreService,private _rollService: rollService,private _diceValueService: diceValueService){
    this._scoreService.listenSco().subscribe((m:any) =>{
      if (parseInt(m)%parseInt(m)==0){
        for (let i = 0; i <= 5; i++) {

          this.diceValues[i]=m.substring(i,i+1)

        }

      }






      this.addPoints()
    })

  }

  score(x :any){
    this.category = x
    this._scoreService.filterSco("send dice");

    console.log(x)
    if(this.checkDie()){
      this.addPoints()
    }
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

  checkDie(){//values: any){

    return true
  }


  ngOnInit(): void {
  }

}
