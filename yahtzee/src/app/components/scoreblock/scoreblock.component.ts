import { Component, Input, OnInit } from '@angular/core';
import { bonusScoreService } from 'src/app/bonusScoreService';
import { diceValueService } from 'src/app/diceValueService';
import { rollService } from 'src/app/rollService';
import { scoreService } from 'src/app/scoreService';
import { totalScoreService } from 'src/app/totalScoreService';



@Component({
  selector: 'app-scoreblock',
  templateUrl: './scoreblock.component.html',
  styleUrls: ['./scoreblock.component.css']
})
export class ScoreblockComponent implements OnInit {
  @Input() name!: string;
  value:any = null
  category! : string;
  diceValues:any =[0,0,0,0,0] // the values of the dice after rolled, is updated everytime the roll button is clicked unless a specifice die is held
  countRolls=0
  count=0
  index=0
  yahtzeeValue: any
  used =[false, false, false, false, false, false, false,] //this list is used to check conditions for the joker yahtzee. Yahtzee index 0, 1s index 1, 2s index 2 ...

  constructor(private _scoreService:scoreService,private _rollService: rollService,private _diceValueService: diceValueService,private _totalScoreService:totalScoreService,private _bonusScoreService:bonusScoreService){

    this._diceValueService.listenDie().subscribe((message:any) => {
      // diceValues is updated every roll by recieving a signal containing a list of the dice values
      if ((parseInt(message)%parseInt(message)==0)) {//checking to see if recieved signal is a number
        this.diceValues[this.index%5]=message //taking the signal and adding the values to a list
        this.index++
      }
    })

    this._scoreService.listenSco().subscribe((message:any) =>{

      if(message=="checkBonus35")//sending a signal once all number categories are used so the bonus 35 can be awarded or not
        if(this.checkUsedAllNumbers()){
          this._bonusScoreService.filterBSco(this.value)
        }
      if(message=="checkBonusYahtzee"){// sending a signal if the user is to earn a yahtzee chip
        if (this.checkBonusYahtzeeChip())
          this._bonusScoreService.filterBSco("bonusYahtzee")
      }

      //this if statements are used to help set conditions for the joker yahtzee (setting the respective number categoy to used)
      if(message=="YHTRUE"){
        this.used[0]=true
      }
      if(message=="OneTRUE"){
        this.used[1]=true

      }
      if(message=="TwoTRUE"){
        this.used[2]=true

      }
      if(message=="ThreeTRUE"){
        this.used[3]=true

      }
      if(message=="FourTRUE"){
        this.used[4]=true

      }
      if(message=="FiveTRUE"){
        this.used[5]=true

      }
      if(message=="SixTRUE"){
        this.used[6]=true

      }
    })



    this._rollService.listen().subscribe((message:any) => {//used to count the rolls to help display correct elements of the scoreblock
      if ((message =="roll clicked")&&(this.countRolls<=2)) {
        this.countRolls++
      }
      if (message=="reset"){
        this.countRolls=0
      }
    })
    this._bonusScoreService.listenBSco().subscribe((message:any) =>{// used to set the yahtzee score to fifty(used for bonus chips)
      if (message=="Yahtzee50"){
              this.yahtzeeValue=50
            }
          })
  }

  score(x :any){ //runs a function to asign a value to the scored category, sends messages to reset the roll counter and held dice, and sends messages to check for bonus scoring conditions
    this.category = x
    console.log("Scoring:",x)
    //this.diceValues=[ 2,1,1,1,1] // used to change dice to values to what I want to check scoring and game logic
    this._scoreService.filterSco("checkBonusYahtzee")
    this.checkDie()
    this._rollService.filter("reset")
    this._totalScoreService.filterTSco(this.value)
    this._scoreService.filterSco("checkBonus35")

  }

  checkDie(){//this function takes the name as an argument and applies the right logic to check and calculate the users score for the category they picked
    let count=0
    switch(this.name) {
      case "1s"://counts number of 1s and mutiplies by 1
        count=0
        for (let i = 0; i < this.diceValues.length; i++){
          if(this.diceValues[i]==1){
            count++
          }
        }
        this.value=(count*1)
        console.log("Sum of",this.name, "equals",this.value)
        this._scoreService.filterSco("OneTRUE")
        break;
      case "2s"://counts number of 2s and mutiplies by 2
        count=0
        for (let i = 0; i < this.diceValues.length; i++){
          if(this.diceValues[i]==2){
            count++
          }
        }
        this.value=(count*2)
        console.log("Sum of",this.name, "equals",this.value)
        this._scoreService.filterSco("TwoTRUE")
        break;
      case "3s"://counts number of 3s and mutiplies by 3
        count=0
        for (let i = 0; i < this.diceValues.length; i++){
          if(this.diceValues[i]==3){
            count++
          }
        }
        this.value=(count*3)
        console.log("Sum of",this.name, "equals",this.value)
        this._scoreService.filterSco("ThreeTRUE")
        break;
      case "4s"://counts number of 4s and mutiplies by 4
        count=0
        for (let i = 0; i < this.diceValues.length; i++){
          if(this.diceValues[i]==4){
            count++
          }
        }
        this.value=(count*4)
        console.log("Sum of",this.name, "equals",this.value)
        this._scoreService.filterSco("FourTRUE")
        break;
      case "5s"://counts number of 5s and mutiplies by 5
        count=0
        for (let i = 0; i < this.diceValues.length; i++){
          if(this.diceValues[i]==5){
            count++
          }
        }
        this.value=(count*5)
        console.log("Sum of",this.name, "equals",this.value)
        this._scoreService.filterSco("FiveTRUE")
        break;
      case "6s"://counts number of 6s and mutiplies by 6
        count=0
        for (let i = 0; i < this.diceValues.length; i++){
          if(this.diceValues[i]==6){
            count++
          }
        }
        this.value=(count*6)
        console.log("Sum of",this.name, "equals",this.value)
        this._scoreService.filterSco("SixTRUE")
        break;
      case "Small Straight"://checks the three ways to get a small straight 1234 , 2345 , 3456
        let testS=false
        for (let j=0; j<this.diceValues.length; j++)//Checking for 1,2,3,4
          if (this.diceValues[j]==2) // looking for a 2 in the list of values
            for (let k=0; k<this.diceValues.length; k++)
              if (this.diceValues[k]==3)// looking for a 3 in the list of values
                for (let l=0; l<this.diceValues.length; l++)
                  if (this.diceValues[l]==4)// looking for a 4 in the list of values
                    for (let m=0; m<this.diceValues.length; m++)
                      if (this.diceValues[m]==1)// looking for a 1 in the list of values
                        testS = true;
        for (let j=0; j<this.diceValues.length; j++)//Checking for 2,3,4,5
          if (this.diceValues[j]==2)// looking for a 2 in the list of values
            for (let k=0; k<this.diceValues.length; k++)
              if (this.diceValues[k]==3)// looking for a 3 in the list of values
                for (let l=0; l<this.diceValues.length; l++)
                  if (this.diceValues[l]==4)// looking for a 4 in the list of values
                    for (let m=0; m<this.diceValues.length; m++)
                      if (this.diceValues[m]==5)// looking for a 5 in the list of values
                        testS = true;
        for (let j=0; j<this.diceValues.length; j++)//Checking for 3,4,5,6
          if (this.diceValues[j]==6)// looking for a 6 in the list of values
            for (let k=0; k<this.diceValues.length; k++)
              if (this.diceValues[k]==3)// looking for a 3 in the list of values
                for (let l=0; l<this.diceValues.length; l++)
                  if (this.diceValues[l]==4)// looking for a 4 in the list of values
                    for (let m=0; m<this.diceValues.length; m++)
                      if (this.diceValues[m]==5)// looking for a 5 in the list of values
                        testS = true;

        if(((this.checkYahtzee()==true)&&(this.used[0]))&&(this.used[this.diceValues[0]])){//checking for joker
          testS=true
        }
        if(testS){
          this.value=30
        }
        else{
          this.value=0
        }
        console.log( "Conditions for",this.name, testS? "have":"haven't", "been met")
        break
      case "Large Straight"://checks the two ways to get a large straight 12345 and 23456
        let test=false

        for (let i=0; i<this.diceValues.length; i++)//Checking for 1,2,3,4,5
            if (this.diceValues[i]==1)// looking for a 1 in the list of values
              for (let j=0; j<this.diceValues.length; j++)
                if (this.diceValues[j]==2)// looking for a 2 in the list of values
                  for (let k=0; k<this.diceValues.length; k++)
                    if (this.diceValues[k]==3)// looking for a 3 in the list of values
                      for (let l=0; l<this.diceValues.length; l++)
                        if (this.diceValues[l]==4)// looking for a 4 in the list of values
                          for (let m=0; m<this.diceValues.length; m++)
                            if (this.diceValues[m]==5)// looking for a 5 in the list of values
                              test = true;
        for (let i=0; i<this.diceValues.length; i++) //Checking for 2,3,4,5,6
          if (this.diceValues[i]==6)// looking for a 6 in the list of values
            for (let j=0; j<this.diceValues.length; j++)
              if (this.diceValues[j]==2)// looking for a 2 in the list of values
                for (let k=0; k<this.diceValues.length; k++)
                  if (this.diceValues[k]==3)// looking for a 3 in the list of values
                    for (let l=0; l<this.diceValues.length; l++)
                      if (this.diceValues[l]==4)// looking for a 4 in the list of values
                        for (let m=0; m<this.diceValues.length; m++)
                          if (this.diceValues[m]==5)// looking for a 5 in the list of values
                            test = true;

        if(((this.checkYahtzee()==true)&&(this.used[0]))&&(this.used[this.diceValues[0]])){//checking for joker
          test=true
        }
        if(test){
          this.value=40
        }
        else{
          this.value=0
        }
        console.log( "Conditions for",this.name, test? "have":"haven't", "been met")
        break
      case "3 of a Kind"://check for three of the same value
        let test3=false
        var sum =0
        let val=0
        let dice = this.diceValues
        let count3=0
        for(let i=0; i<this.diceValues.length;i++){
          count3=0
          val=this.diceValues[i]// picking a value
          for(let j =0; j<dice.length;j++){
            if(val==dice[j]){ //checking for the value in the list of values and counting the amount of times that value is found
              count3++
            }
          }
          if(count3>=3){
            test3=true
          }
        }
        if(test3){
          for(let i =0; i<  this.diceValues.length; i++){// summing up all the dice values
            sum = sum+(parseInt(dice[i]))
          }
          this.value=sum
        }
        else{
          this.value=0
        }
        console.log( "Conditions for",this.name, test3? "have":"haven't", "been met")
        break
      case "4 of a Kind"://check for four of the same value
        let test4=false
        var sum4 =0
        let val4=0
        let dice4 = this.diceValues
        let count4=0
        for(let i=0; i<this.diceValues.length;i++){
          count4=0
          val4=this.diceValues[i]// picking a value
          for(let j =0; j<dice4.length;j++){
            if(val4==dice4[j]){ //checking for the value in the list of values and counting the amount of times that value is found
              count4++
            }
          }
          if(count4>=4){
            test4=true
          }
        }
        if(test4){
          for(let i =0; i<  this.diceValues.length; i++){// summing up all the dice values
            sum4 = sum4+(parseInt(dice4[i]))
          }
          this.value=sum4
        }
        else{
          this.value=0
        }
        console.log( "Conditions for",this.name, test4? "have":"haven't", "been met")
        break
      case "Full House"://checks for a 3 of the same number and 2 of the same number
        let testFH=false
        let valFH=0
        let diceFH:any =[]
        let countFH=0
        let indexFH=0
        for(let i=0; i<this.diceValues.length;i++){
          countFH=0
          indexFH=0
          diceFH=[]
          valFH=this.diceValues[i]//selecting a number in the value list
          for(let j =0; j<this.diceValues.length;j++){
            if(valFH==this.diceValues[j]){//checking the number against all the numbers in the list
              countFH++
            }
            else{
              diceFH[indexFH] = this.diceValues[j]//puting the numbers that are different in a new list
              indexFH++
            }
          if((countFH>=3)&&(diceFH[0]==diceFH[1])){//if a full house, there should be three similar values counted, and the remaining values in the new list should match
            testFH=true
          }
          }
        }
        if(((this.checkYahtzee()==true)&&(this.used[0]))&&(this.used[this.diceValues[0]])){//checking for joker
          testFH=true
        }
        if(testFH){
          this.value=25
        }
        else{
          this.value=0
        }
        console.log( "Conditions for",this.name, testFH? "have":"haven't", "been met")
        break
      case "Chance":// summing the values of all the dice
        var sumC=0
        let diceC = this.diceValues
        for(let i =0; i<  this.diceValues.length; i++){
          sumC = sumC+(parseInt(diceC[i]))
        }
        this.value=sumC
        break
      case "Yahtzee":// checking for 5 of a kind
        if(this.checkYahtzee()){
          this.value=50
          this._bonusScoreService.filterBSco("Yahtzee50")
        }
        else{
          this.value=0
        }
        console.log( "Conditions for",this.name, this.checkYahtzee()? "have":"haven't", "been met")
        this._scoreService.filterSco("YHTRUE")
        break;
      default:
        this.value=0
    }
    return true
  }

checkYahtzee(){//checks if each value is equall to each other
  if(((this.diceValues[0] ==this.diceValues[1] )&&(this.diceValues[2] ==this.diceValues[3] ))&&
        ((this.diceValues[0] ==this.diceValues[4] )&&(this.diceValues[0] ==this.diceValues[2]))){
          return true
  }
  else{
    return false
  }
}


checkUsedAllNumbers(){// checks to see if all the number categories have been used
  if((this.used[1])&&(this.used[2])&&(this.used[3])&&(this.used[4])&&(this.used[5])&&(this.used[6])){
    return true
  }
  else{
    return false
  }
}

checkBonusYahtzeeChip(){// checking the conditions to see if the player earns a yahtzee chip
  if ((this.checkYahtzee())&&((this.yahtzeeValue==50)&&(this.used[0]))){
    return true
  }
  else{
    return false
  }
}

  ngOnInit(): void {
  }

}
