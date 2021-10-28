import { Component, OnInit } from '@angular/core';
import { diceValueService } from 'src/app/diceValueService';
import { rollService } from 'src/app/rollService';
import { scoreService } from 'src/app/scoreService';

@Component({
  selector: 'app-scorecard',
  templateUrl: './scorecard.component.html',
  styleUrls: ['./scorecard.component.css']
})
export class ScorecardComponent implements OnInit {
countRolls=0
index=0
diceValues=[0,0,0,0,0]
stringDie: string =""
  constructor(private _rollService:rollService, private _diceValueService:diceValueService,private _scoreService:scoreService) {

    this._rollService.listen().subscribe((m:any) => {
      if ((m =="roll clicked")&&(this.countRolls<=2)) {
        this.countRolls++
      }
      if (m=="reset"){
        this.countRolls=0
      }
    })

    this._diceValueService.listenDie().subscribe((m:any) => {
      if ((parseInt(m)%parseInt(m)==0)) {
        this.diceValues[this.index%5]=m
        this.index++
      }


    })

this._scoreService.listenSco().subscribe((m: any)=>{
    if(m=="send dice"){
      for (let i = 0; i < this.diceValues.length; i++) {
        this.stringDie +=this.diceValues[i]
      }



      this._scoreService.filterSco(this.stringDie)
    }





})

  }


printNum(){
  console.log(this.diceValues)
}


  ngOnInit(): void {
  }

}
