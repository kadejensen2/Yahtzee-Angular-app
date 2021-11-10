import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';


@Injectable()
export class totalScoreService {//service used to pass messages realted to the total score
    private _listners = new Subject<any>();

    listenTSco(): Observable<any> {
       return this._listners.asObservable();
    }

    filterTSco(filterBy: string) {
       this._listners.next(filterBy);
    }

}
