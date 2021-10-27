import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';


@Injectable()
export class scoreService {
    private _listners = new Subject<any>();

    listenSco(): Observable<any> {
       return this._listners.asObservable();
    }

    filterSco(filterBy: string) {
       this._listners.next(filterBy);
    }

}
