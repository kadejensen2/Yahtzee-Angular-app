import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { bonusScoreService } from 'src/app/bonusScoreService';
import { diceValueService } from 'src/app/diceValueService';
import { rollService } from 'src/app/rollService';
import { scoreService } from 'src/app/scoreService';
import { totalScoreService } from 'src/app/totalScoreService';






//add console tracking and document in code
//yahtzee chips when original yahtzee scores and the player rolls another yahtzee they gain a chip each is 100 pts
















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
  yahtzeeValue: any
  used =[false, false, false, false, false, false, false,] //this list is used to check conditions for the joker yahtzee. Yahtzee index 0, 1s index 1, 2s index 2 ...

  constructor(private _scoreService:scoreService,private _rollService: rollService,private _diceValueService: diceValueService,private _totalScoreService:totalScoreService,private _bonusScoreService:bonusScoreService){

    this._diceValueService.listenDie().subscribe((m:any) => {
      // diceValues is updated every roll by recieving a signal containing a list of the dice values
      if ((parseInt(m)%parseInt(m)==0)) {//checking to see if recieved signal is a number
        this.diceValues[this.index%5]=m //taking the signal and adding the values to a list
        this.index++
        //console.log(this.diceValues)
      }
    })


    this._scoreService.listenSco().subscribe((m:any) =>{
      if (parseInt(m)%parseInt(m)==0){//checking to see if the signal recieved is a number
        for (let i = 0; i <= 4; i++) {

          this.diceValues[i]=m.substring(i,i+1)

        }
        console.log(this.diceValues)
      }
      if(m=="checkBonus35")
        if(this.checkUsedAllNumbers()){
          this._bonusScoreService.filterBSco(this.value)
        }
      if(m=="checkBonusYahtzee"){
        if (this.checkBonusYahtzeeChip())
          this._bonusScoreService.filterBSco("bonusYahtzee")
      }

      //this if statements are used to help set conditions for the joker yahtzee
      if(m=="YHTRUE"){
        this.used[0]=true
      }
      if(m=="OneTRUE"){
        this.used[1]=true

      }
      if(m=="TwoTRUE"){
        this.used[2]=true

      }
      if(m=="ThreeTRUE"){
        this.used[3]=true

      }
      if(m=="FourTRUE"){
        this.used[4]=true

      }
      if(m=="FiveTRUE"){
        this.used[5]=true

      }
      if(m=="SixTRUE"){
        this.used[6]=true

      }
    })



    this._rollService.listen().subscribe((m:any) => {//used to count the rolls to help display correct elements of the scoreblock
      if ((m =="roll clicked")&&(this.countRolls<=2)) {
        this.countRolls++
      }
      if (m=="reset"){
        this.countRolls=0
      }
    })
    this._bonusScoreService.listenBSco().subscribe((m:any) =>{
      if (m=="Yahtzee50"){
              this.yahtzeeValue=50
            }
          })
  }

  score(x :any){
    this.category = x

    console.log("Scoring:",x)
    this.diceValues=[ 3,3,3,3,3] // use to change dice to values to what i want to check scoring logic
    this._scoreService.filterSco("checkBonusYahtzee")
    this.checkDie()
    this._rollService.filter("reset")
    //console.log(this.used)
    this._totalScoreService.filterTSco(this.value)
    //this.checkYahtzeeChips()
    this._scoreService.filterSco("checkBonus35")

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
        console.log(count, "of", this.name)
        this._scoreService.filterSco("OneTRUE")
        break;
      case "2s":
        count=0
        for (let i = 0; i < this.diceValues.length; i++){
          if(this.diceValues[i]==2){
            count++
          }
        }
        this.value=(count*2)
        console.log(count, "of", this.name)
        this._scoreService.filterSco("TwoTRUE")
        break;
      case "3s":
        count=0
        for (let i = 0; i < this.diceValues.length; i++){
          if(this.diceValues[i]==3){
            count++
          }
        }
        this.value=(count*3)
        console.log(count, "of", this.name)
        this._scoreService.filterSco("ThreeTRUE")
        break;
      case "4s":
        count=0
        for (let i = 0; i < this.diceValues.length; i++){
          if(this.diceValues[i]==4){
            count++
          }
        }
        this.value=(count*4)
        console.log(count, "of", this.name)
        this._scoreService.filterSco("FourTRUE")
        break;
      case "5s":
        count=0
        for (let i = 0; i < this.diceValues.length; i++){
          if(this.diceValues[i]==5){
            count++
          }
        }
        this.value=(count*5)
        console.log(count, "of", this.name)
        this._scoreService.filterSco("FiveTRUE")
        break;
      case "6s":
        count=0
        for (let i = 0; i < this.diceValues.length; i++){
          if(this.diceValues[i]==6){
            count++
          }
        }
        this.value=(count*6)
        console.log(count, "of", this.name)
        this._scoreService.filterSco("SixTRUE")
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

        if(((this.checkYahtzee()==true)&&(this.used[0]))&&(this.used[this.diceValues[0]])){
          testS=true
        }
        if(testS){
          this.value=30
        }
        else{
          this.value=0
        }
        console.log( this.name,"is", testS)
        break
      case "Large Straight"://only two ways to get a large straight 12345 and 23456
        let test=false
        console.log(this.checkYahtzee)//,this.yahtzeeUsed,"\n",this.diceValues)
        if(((this.checkYahtzee()==true)&&(this.used[0]))&&(this.used[this.diceValues[0]])){test=true}
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
        console.log( this.name,"is", test)
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
            if(val==dice[j]){
              count3++
            }
          }
          if(count3>=3){
            test3=true
          }
        }
        if(test3){
          for(let i =0; i<  this.diceValues.length; i++){
            sum = sum+(parseInt(dice[i]))
          }
          this.value=sum
        }
        else{
          this.value=0
        }
        console.log( this.name,"is", test3)
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
            if(val4==dice4[j]){
              count4++
            }
          }
          if(count4>=4){
            test4=true
          }
        }
        if(test4){
          for(let i =0; i<  this.diceValues.length; i++){
            sum4 = sum4+(parseInt(dice4[i]))
          }
          this.value=sum4
        }
        else{
          this.value=0
        }
        console.log( this.name,"is", test4)
        break
      case "Full House":
        let testFH=false
        let valFH=0
        let diceFH:any =[]
        let countFH=0
        let indexFH=0
        if(((this.checkYahtzee()==true)&&(this.used[0]))&&(this.used[this.diceValues[0]])){testFH=true}
        for(let i=0; i<this.diceValues.length;i++){
          countFH=0
          indexFH=0
          diceFH=[]
          valFH=this.diceValues[i]
          for(let j =0; j<this.diceValues.length;j++){
            if(valFH==this.diceValues[j]){
              countFH++
            }
            else{
              diceFH[indexFH] = this.diceValues[j]
              indexFH++
            }
          if((countFH>=3)&&(diceFH[0]==diceFH[1])){testFH=true}
          }
        }
        if(testFH){
          this.value=25
        }
        else{
          this.value=0
        }
        console.log( this.name,"is", testFH)
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

        if(this.checkYahtzee()){
          this.value=50
          this._bonusScoreService.filterBSco("Yahtzee50")
        }
        else{
          this.value=0
        }
        console.log( this.name,"is", this.checkYahtzee())
        this._scoreService.filterSco("YHTRUE")
        break;
      default:
        this.value=0
    }
    return true
  }

checkYahtzee(){
  if(((this.diceValues[0] ==this.diceValues[1] )&&(this.diceValues[2] ==this.diceValues[3] ))&&
        ((this.diceValues[0] ==this.diceValues[4] )&&(this.diceValues[0] ==this.diceValues[2]))){
          return true
        }
  else{
    return false
  }
}


checkUsedAllNumbers(){
  if((this.used[1])&&(this.used[2])&&(this.used[3])&&(this.used[4])&&(this.used[5])&&(this.used[6])){
    return true
  }
  else{
    return false
  }
}

checkBonusYahtzeeChip(){
  if ((this.checkYahtzee())&&((this.yahtzeeValue==50)&&(this.used[0]))){
    return true
  }
  else{return false}
}

  ngOnInit(): void {
  }

}
