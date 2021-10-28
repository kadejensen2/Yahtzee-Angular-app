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
  diceValues:any =[0,0,0,0,0]
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
    //this.diceValues=[ 3,3,3,3,3] // use to change dice to values i want to check scoring logic
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
      case "3 of a Kind":
        let test3=false
        var sum =0
        let val=0
        let dice = this.diceValues
        let count3=0
        for(let i=0; i<this.diceValues.length;i++){
          count3=0
          val=this.diceValues[i]
          for(let j =0; j<dice.length;j++){
            //console.log(val,dice[j])
            if(val==dice[j]){
              count3++
            }
          }
          //console.log("final count", count3)
          if(count3>=3){
            test3=true

          }
        }

        if(test3){
          //console.log(typeof(sum),typeof(dice[1]))
          for(let i =0; i<  this.diceValues.length; i++){
            sum = sum+(parseInt(dice[i]))
          }
          this.value=sum
        }
        else{
          this.value=0
        }
        break

      case "4 of a Kind":
        let test4=false
        var sum4 =0
        let val4=0
        let dice4 = this.diceValues
        let count4=0
        for(let i=0; i<this.diceValues.length;i++){
          count4=0
          val4=this.diceValues[i]
          for(let j =0; j<dice4.length;j++){
            //console.log(val4,dice4[j])
            if(val4==dice4[j]){
              count4++
            }
          }
          //console.log("final count", count4)
          if(count4>=4){
            test4=true

          }
        }

        if(test4){
          //console.log(typeof(sum4),typeof(dice4[1]))
          for(let i =0; i<  this.diceValues.length; i++){
            sum4 = sum4+(parseInt(dice4[i]))
          }
          this.value=sum4
        }
        else{
          this.value=0
        }
        break
      case "Full Houses":// currently works like 3ofaKind
          let testFH=false
          var sum =0
          let valFH=0
          let diceFH = this.diceValues
          let countFH=0
          for(let i=0; i<this.diceValues.length;i++){
            countFH=0
            valFH=this.diceValues[i]
            for(let j =0; j<diceFH.length;j++){
              //console.log(val,dice[j])
              if(valFH==dice[j]){
                countFH++
              }
            }
            //console.log("final count", count3)
            if(countFH>=3){
              test3=true

            }
          }

          if(testFH){
            //console.log(typeof(sum),typeof(dice[1]))

            this.value=25
          }
          else{
            this.value=0
          }
          break





      case "Chance":
      var sumC=0
      let diceC = this.diceValues
      for(let i =0; i<  this.diceValues.length; i++){
        sumC = sumC+(parseInt(diceC[i]))
      }
      this.value=sumC
        break
      case "Yahtzee":
        if(((this.diceValues[0] ==this.diceValues[1] )&&(this.diceValues[2] ==this.diceValues[3] ))&&
        ((this.diceValues[0] ==this.diceValues[4] )&&(this.diceValues[0] ==this.diceValues[2]))){
        this.value=50

      }
      else{
        this.value=0
      }
        break;

      default:
        this.value=0
    }
    return true
  }


  ngOnInit(): void {
  }

}
