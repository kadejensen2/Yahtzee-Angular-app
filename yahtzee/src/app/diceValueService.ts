import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';


@Injectable()
export class diceValueService { //service used to pass messages related to the value of the dice
    private _listners = new Subject<any>();

    listenDie(): Observable<any> {
       return this._listners.asObservable();
    }

    filterDie(filterBy: string) {
       this._listners.next(filterBy);
    }

}
