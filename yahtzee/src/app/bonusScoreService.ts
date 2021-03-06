import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';


@Injectable()
export class bonusScoreService { //service used to pass messages related to the bonus scoring
    private _listners = new Subject<any>();

    listenBSco(): Observable<any> {
       return this._listners.asObservable();
    }

    filterBSco(filterBy: string) {
       this._listners.next(filterBy);
    }

}
