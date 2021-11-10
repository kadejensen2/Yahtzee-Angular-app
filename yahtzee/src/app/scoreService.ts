import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';


@Injectable()
export class scoreService {//service used to pass messages realted to the scoring options and their availability
    private _listners = new Subject<any>();

    listenSco(): Observable<any> {
       return this._listners.asObservable();
    }

    filterSco(filterBy: string) {
       this._listners.next(filterBy);
    }

}
