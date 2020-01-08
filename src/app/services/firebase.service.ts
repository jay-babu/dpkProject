import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';

@Injectable({
    providedIn: 'root'
})
export class FirebaseService {

    constructor(private fireDatabase: AngularFirestore) {

    }

    createNewKirtan(data: any) {
        return new Promise<any>((resolve, reject) => {
            this.fireDatabase
                .collection('kirtan').doc('test')
                .set(data)
                .then(_ => _, err => reject(err));
        });
    }

    getOrders() {
        return this.fireDatabase.collection('kirtan').snapshotChanges();
    }
}
