import { Component, EventEmitter, Output } from '@angular/core';
import { rollService } from './rollService';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'yahtzee';
  @Output() rolled: EventEmitter <any> = new EventEmitter()

  constructor(private _rollService: rollService){}
  emitRoll(){ //emit to roll function
    this._rollService.filter('roll clicked');
  }





}
