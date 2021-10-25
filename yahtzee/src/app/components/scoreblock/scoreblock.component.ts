import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
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
  constructor(private _rollService: rollService){
    this._rollService.listen().subscribe((m:any) => {
        console.log(m, "in score");
        if (m ==1){this.diceValues[0]= m}

    })
  }



  score(x :any){
    this._rollService.filter('score');
    this.signal = "score: "+x
    this.category = x
    console.log(this.signal)
    this.addPoints()
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
