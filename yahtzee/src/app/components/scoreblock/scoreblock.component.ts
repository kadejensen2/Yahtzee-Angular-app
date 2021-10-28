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
    this._rollService.listen().subscribe((m:any) => {
      if ((m =="roll clicked")&&(this.countRolls<=2)) {
        this.countRolls++
      }
      if (m=="reset"){
        this.countRolls=0
      }
    })


  }

  score(x :any){
    this.category = x


    console.log(x)
    this.diceValues=[ 6,5,4,2,3] // use to change dice to values i want to check scoring logic
    this.checkDie()
    this._rollService.filter("reset")

  }


  addPoints(){
    if (this.category == "Full House"){
      this.value = 25
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
      case "Small Straight"://only three ways to get a small straight 1234 , 2345 , 3456
        let testS=false
        for (let j=0; j<this.diceValues.length; j++)//Checking for 1,2,3,4
			if (this.diceValues[j]==2)
				for (let k=0; k<this.diceValues.length; k++)
					if (this.diceValues[k]==3)
						for (let l=0; l<this.diceValues.length; l++)
							if (this.diceValues[l]==4)
								for (let m=0; m<this.diceValues.length; m++)
									if (this.diceValues[m]==1)
										testS = true;
		for (let j=0; j<this.diceValues.length; j++)//Checking for 2,3,4,5
			if (this.diceValues[j]==2)
				for (let k=0; k<this.diceValues.length; k++)
					if (this.diceValues[k]==3)
						for (let l=0; l<this.diceValues.length; l++)
							if (this.diceValues[l]==4)
								for (let m=0; m<this.diceValues.length; m++)
									if (this.diceValues[m]==5)
										testS = true;
		for (let j=0; j<this.diceValues.length; j++)//Checking for 3,4,5,6
			if (this.diceValues[j]==6)
				for (let k=0; k<this.diceValues.length; k++)
					if (this.diceValues[k]==3)
						for (let l=0; l<this.diceValues.length; l++)
							if (this.diceValues[l]==4)
								for (let m=0; m<this.diceValues.length; m++)
									if (this.diceValues[m]==5)
										testS = true;
    if(testS){
      this.value=30
    }
    else{
      this.value=0
    }

        break
      case "Large Straight"://only two ways to get a large straight 12345 and 23456
        let test=false
      for (let i=0; i<this.diceValues.length; i++)//Checking for 1,2,3,4,5
          if (this.diceValues[i]==1)
            for (let j=0; j<this.diceValues.length; j++)
              if (this.diceValues[j]==2)
                for (let k=0; k<this.diceValues.length; k++)
                  if (this.diceValues[k]==3)
                    for (let l=0; l<this.diceValues.length; l++)
                      if (this.diceValues[l]==4)
                        for (let m=0; m<this.diceValues.length; m++)
                          if (this.diceValues[m]==5)
                            test = true;
			for (let i=0; i<this.diceValues.length; i++) //Checking for 2,3,4,5,6
				if (this.diceValues[i]==6)
					for (let j=0; j<this.diceValues.length; j++)
						if (this.diceValues[j]==2)
							for (let k=0; k<this.diceValues.length; k++)
								if (this.diceValues[k]==3)
									for (let l=0; l<this.diceValues.length; l++)
										if (this.diceValues[l]==4)
											for (let m=0; m<this.diceValues.length; m++)
												if (this.diceValues[m]==5)
													test = true;

      if(test){
        this.value=40
      }
      else{
        this.value=0
      }
        break
      case "Yahtzee":
        if(((this.diceValues[0] ==this.diceValues[1] )&&(this.diceValues[2] ==this.diceValues[3] ))&&
        ((this.diceValues[0] ==this.diceValues[4] )&&(this.diceValues[0] ==this.diceValues[2]))){
        this.value=50
      }
        break;

      default:
        this.value=0
    }
    return true
  }
  pr(){ //temp
    console.log(this.diceValues,"in print")
  }

  ngOnInit(): void {
  }

}
