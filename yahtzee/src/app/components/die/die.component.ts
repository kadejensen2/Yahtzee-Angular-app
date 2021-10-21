import { Component, OnInit } from '@angular/core';
import { rollService } from 'src/app/rollService';

@Component({
  selector: 'app-die',
  templateUrl: './die.component.html',
  styleUrls: ['./die.component.css']
})
export class DieComponent implements OnInit {
value = 0
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
  console.log(this.held)
  this.held = !this.held
  this.holding = (this.held? "Yes":"No" )
}
constructor(private _rollService: rollService){
  this._rollService.listen().subscribe((m:any) => {
      //console.log(m);
      if (m =="roll clicked") {this.onFilterClick();}
      //if (m =="score: 1s") {this.printC()}

  })
}

onFilterClick() {

  this.roll()
}


  ngOnInit(): void {
  }

}
