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
  diceValues= [0,0,0,0,0]
  value:any = null
  category! : string;

  countRolls=0
  constructor(private _scoreService:scoreService,private _rollService: rollService,private _diceValueService: diceValueService){
    this._scoreService.listenSco().subscribe((m:any) =>{
      this.score(m)





      this.addPoints()
    })

  }

  score(x :any){
    //this._scoreService.filterSco(x);
    this.category = x
    console.log(x)
    if(this.checkDie()){
      this.addPoints()
    }
    this._rollService.filter("reset")

  }
  printNum(){
    this._diceValueService.filterDie("s")
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
