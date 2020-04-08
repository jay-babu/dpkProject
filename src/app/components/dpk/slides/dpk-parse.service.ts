import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { FirebaseBhajan } from '../../../interfaces/bhajan';
import { Observable, Subject } from 'rxjs';
import { take } from 'rxjs/operators';

@Injectable({
    providedIn: 'root'
})
export class DpkParseService {
    private _firebaseBhajan: Subject<FirebaseBhajan>;
    firebaseBhajan$: Observable<FirebaseBhajan>;

    constructor(private fireDB: AngularFirestore) {
        this._firebaseBhajan = new Subject<FirebaseBhajan>();
        this.firebaseBhajan$ = this._firebaseBhajan.asObservable();
    }

    getDPK(dpk: string, name: string) {
        this.fireDB.collection(dpk).doc<FirebaseBhajan>(name).valueChanges().pipe(take(1)).subscribe(
            firebaseBhajan => this._firebaseBhajan.next(firebaseBhajan)
        );
        return this.firebaseBhajan$;
    }

    parseSlideText(slideText: string[]) {
        return slideText.map(paragraph => paragraph.split(`\n`));
    }

    firebaseParseText(text: string[]) {
        let newS = '';
        for (const s of text) {
            for (const l of s.split('\n')) {
                newS = newS.concat(l, '\n');
            }
            newS = newS.concat('\n');
        }
        return newS.trim();
    }

    firebaseParseNumber(timings: number[]) {
        let times = '';
        if (isNaN(timings[0])) {
            return times;
        }
        for (const num of timings) {
            const min = Math.floor(num / 60);
            const seconds = num % 60;
            times = times.concat(`${ min }:${ seconds }`, '\n\n');
        }
        return times.trim();
    }
}
