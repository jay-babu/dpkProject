import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { Bhajan, FirebaseBhajan } from '../../interfaces/bhajan';

@Injectable({
    providedIn: 'root'
})
export class DpkParseService {

    constructor(private fireDB: AngularFirestore) {
    }

    getDPK(dpk: string, name: string) {
        // this.articles$ = this.fireDB.collection<Bhajan>(dpk)
        //     .snapshotChanges().pipe(
        //         map(actions => actions.map(a => {
        //             const data = a.payload.doc.data() as Bhajan;
        //             const title = a.payload.doc.id;
        //             return {title, ...data};
        //         }))
        //     );
        return this.fireDB.collection(dpk).doc<FirebaseBhajan>(name).valueChanges();
        // this.articles$.subscribe(data => console.log(data));
    }

    fireDBToBhajan(data: any) {
        if (data.definitions !== undefined && data.lyrics) {
            // console.log(data.definitions);
            let bhajan: Bhajan;
            // bhajan.definitions = [for (const d of data.definitions) d.split(`\n`)];
            bhajan.definitions = data.definitions.map(d => d.split(`\n`));
            bhajan.lyrics = data.lyrics.map(d => d.split(`\n`));
            bhajan.imageNames = data.imageNames;
            return bhajan;
        }
    }
}
