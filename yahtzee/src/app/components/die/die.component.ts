import { Component, OnInit } from '@angular/core';
import { diceValueService } from 'src/app/diceValueService';
import { rollService } from 'src/app/rollService';
import { scoreService } from 'src/app/scoreService';

@Component({
  selector: 'app-die',
  templateUrl: './die.component.html',
  styleUrls: ['./die.component.css']
})
export class DieComponent implements OnInit {
value = 0
showHold=false
held = false
holding = "No"
  die1="../../../assets/die 1.png"
  die2="../../../assets/die 2.png"
  die3="../../../assets/die 3.png"
  die4="../../../assets/die 4.png"
  die5="../../../assets/die 5.png"
  die6="../../../assets/die 6.png"
dieValues= [this.die1, this.die2, this.die3, this.die4, this.die5, this.die6]
dieValue = this.dieValues[this.value]
countRolls=0

getRandomInt(min: number, max: number) : number{
	min = Math.ceil(min);
	max = Math.floor(max);
	return Math.floor(Math.random() * (max - min + 1)) + min;
}

roll(){
  if (this.held){
    this.value= this.value
  }
  else{
    this.value = this.getRandomInt(0,5)
    this.dieValue = this.dieValues[this.value]
  }
  //console.log("hit", this.value)

}

changeHold(){
  //console.log(this.held)
  this.held = !this.held
  this.holding = (this.held? "Yes":"No" )
}
constructor(private _rollService: rollService,private _diceValueService: diceValueService,private _scoreService:scoreService){
  this._rollService.listen().subscribe((m:any) => {
     // console.log(m=="roll clicked", "die",m)
      if ((m =="roll clicked")&&(this.countRolls<=2)) {this.onFilterClick()
        //console.log(m, this.countRolls)
        this.countRolls++
        this.showHold=true
      }
      if (m=="reset"){
        this.countRolls=0
        this.showHold=false
        this.held=false
        this.holding="no"
      }
      //else{console.log(m,"in the die comp")}


  })
}

onFilterClick() {

  this.roll()

  //console.log(this.value+1)
  this._diceValueService.filterDie(String(this.value+1))

}


  ngOnInit(): void {
  }

}
