import { Component, Input, OnInit } from '@angular/core';


@Component({
  selector: 'app-scoreblock',
  templateUrl: './scoreblock.component.html',
  styleUrls: ['./scoreblock.component.css']
})
export class ScoreblockComponent implements OnInit {
  @Input() name!: string;

  value:any = null
  signal!: string;
  category! : string;
  constructor() { }




  score(x :any){
    this.signal = "score: "+x
    this.category = x
    console.log(this.signal)
    this.addPoints()
  }


  addPoints(){
    if (this.category == "Full House"){
      this.value = 25
    }
  }

  checkDie(){

  }

  ngOnInit(): void {
  }

}
