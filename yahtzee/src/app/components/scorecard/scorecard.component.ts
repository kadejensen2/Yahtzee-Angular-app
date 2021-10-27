import { Component, OnInit } from '@angular/core';
import { rollService } from 'src/app/rollService';

@Component({
  selector: 'app-scorecard',
  templateUrl: './scorecard.component.html',
  styleUrls: ['./scorecard.component.css']
})
export class ScorecardComponent implements OnInit {
countRolls=0
  constructor(private _rollService:rollService) {

    this._rollService.listen().subscribe((m:any) => {
      if ((m =="roll clicked")&&(this.countRolls<=2)) {
        this.countRolls++
      }
      if (m=="reset"){
        this.countRolls=0
      }
    })

  }

  ngOnInit(): void {
  }

}
