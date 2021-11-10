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
  die1="../../../assets/die 1.png"//die pictures
  die2="../../../assets/die 2.png"
  die3="../../../assets/die 3.png"
  die4="../../../assets/die 4.png"
  die5="../../../assets/die 5.png"
  die6="../../../assets/die 6.png"
  die1h="../../../assets/die 1 held.png"
  die2h="../../../assets/die 2 held.png"
  die3h="../../../assets/die 3 held.png"
  die4h="../../../assets/die 4 held.png"
  die5h="../../../assets/die 5 held.png"
  die6h="../../../assets/die 6 held.png"
dieValues= [this.die1, this.die2, this.die3, this.die4, this.die5, this.die6]// die pictures list
dieValuesHeld= [this.die1h, this.die2h, this.die3h, this.die4h, this.die5h, this.die6h]// held die pictures list
diePic = this.dieValues[this.value] //using the value as index for the correct picture
diePic2 =this.dieValuesHeld[this.value] //using the value as index for the correct picture
countRolls=0

getRandomInt(min: number, max: number) : number{ // generates a random number
	min = Math.ceil(min);
	max = Math.floor(max);
	return Math.floor(Math.random() * (max - min + 1)) + min;
}

roll(){  //rolls the dice
  if (this.held){//checks if dice is held, if so the value doesn't change
    this.value= this.value
  }
  else{// change value to a random number 0-5
    this.value = this.getRandomInt(0,5)
    this.diePic = this.dieValues[this.value]
    this.diePic2 =this.dieValuesHeld[this.value]
  }
}

changeHold(){// toggles the held variable
  this.held = !this.held
}
constructor(private _rollService: rollService,private _diceValueService: diceValueService){
  this._rollService.listen().subscribe((message:any) => {//listing for signals to count rolls and display the hold button
      if ((message =="roll clicked")&&(this.countRolls<=2)) {this.onFilterClick()
        this.countRolls++
        this.showHold=true
      }
      if (message=="reset"){// resets the roll count and hides the hold button before the first roll of a turn
        this.countRolls=0
        this.showHold=false
        this.held=false
      }
  })
}

onFilterClick() { //runs the roll funtion
  this.roll()
  console.log("Roll", this.countRolls+1)
  this._diceValueService.filterDie(String(this.value+1)) //sends the value +1 (since it is between 0 and 5) so it can be added to the value list
}


  ngOnInit(): void {
  }

}
