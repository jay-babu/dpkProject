import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { FirebaseBhajan } from '../../interfaces/bhajan';

@Injectable({
    providedIn: 'root'
})
export class DpkParseService {

    constructor(private fireDB: AngularFirestore) {
    }

    getDPK(dpk: string, name: string) {
        return this.fireDB.collection(dpk).doc<FirebaseBhajan>(name).valueChanges();
    }

    parseSlideText(slideText: string[]) {
        return slideText.map(paragraph => paragraph.split(`\n`));
    }
}
