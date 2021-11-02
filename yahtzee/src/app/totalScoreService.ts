import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';


@Injectable()
export class totalScoreService {
    private _listners = new Subject<any>();

    listenTSco(): Observable<any> {
       return this._listners.asObservable();
    }

    filterTSco(filterBy: string) {
       this._listners.next(filterBy);
    }

}
