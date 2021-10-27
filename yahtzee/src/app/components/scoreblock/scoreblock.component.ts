import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { diceValueService } from 'src/app/diceValueService';
import { rollService } from 'src/app/rollService';



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
  signal!: string;
  category! : string;
  previousIn=""
  countRolls=0
  constructor(private _diceValueService: diceValueService,private _rollService: rollService){
    this._diceValueService.listenDie().subscribe((m:any) => {


    // if(this.count%13==0){
    //   console.log(m, "dice", this.count)}
    //else{console.log(this.count)}

    if (m=="score"){
      if(parseInt(m)%parseInt(m)== 0){
        for (var _i = 0; _i <this.diceValues.length ; _i++) {
        this.diceValues[_i] = m}
      }
    }
      //console.log(_i)}
      //console.log(m);
        //if (m%1== 1){this.diceValues[0]= m}
        // if (m== 2){this.diceValues[1]= m}
        // if (m== 3){this.diceValues[2]= m}
        // if (m== 4){this.diceValues[3]= m}
        // if (m== 5){this.diceValues[4]= m}
        // if (m== 6){this.diceValues[5]= m}
        if(m=="print"){
          this.printNum()
        }


    })


  }

  score(x :any){
    //this._diceValueService.filterDie('scoring');
    this.signal = "score: "+x
    this.category = x
    console.log(this.signal,"score fun")
    this.addPoints()
    this._rollService.filter("reset")
  }
  printNum(){
    console.log(this.diceValues)
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

  }

  ngOnInit(): void {
  }

}
