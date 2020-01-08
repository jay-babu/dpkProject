import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { FormGroup, ValidationErrors } from '@angular/forms';
import { Bhajan } from '../../interfaces/bhajan';


@Injectable({
    providedIn: 'root'
})
export class DpkFormService {

    constructor(private fireDB: AngularFirestore) {
    }

    validSubmission: ValidationErrors = (form: FormGroup) => {
        let status: ValidationErrors;

        if (form.get('lyrics').value === null) {
            form.patchValue({lyrics: ''});
        }
        if (form.get('imagePaths').value === null) {
            form.patchValue({imagePaths: ''});
        }
        if (form.get('definitions').value === null) {
            form.patchValue({definitions: ''});
        }

        const lyrics: string[] = form.get('lyrics').value.split(/\n{2,}/g);
        const imagePaths: string[] = form.get('imagePaths').value.split(/\n{2,}/g);

        status = (lyrics.length === imagePaths.length) ? null : {ldp: true};

        if (form.value.definitions !== '' && status === null) {
            const definitions: string[] = form.get('definitions').value.split(/\n{2,}/g);

            status = (lyrics.length === definitions.length) ? null : {ldp: true};
        }
        return status;
    };

    submitDPK(bhajan: Bhajan, collection: string, path: string) {
        return new Promise<any>((resolve, reject) => {
            this.fireDB
                .collection(collection).doc(path)
                .set(bhajan)
                .then(_ => _, err => reject(err));
        });
    }
}
