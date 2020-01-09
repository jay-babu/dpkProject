import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { FormGroup, ValidationErrors } from '@angular/forms';


@Injectable({
    providedIn: 'root'
})
export class DpkFormService {

    constructor(private fireDB: AngularFirestore) {
    }

    validSubmission: ValidationErrors = (form: FormGroup) => {
        let status: ValidationErrors;

        if (form.value.lyrics === null) {
            form.patchValue({lyrics: ''});
        }
        if (form.value.imagePaths === null) {
            form.patchValue({imagePaths: ''});
        }
        if (form.value.definitions === null) {
            form.patchValue({definitions: ''});
        }

        const lyrics: string[] = form.value.lyrics.split(/\n{2,}/g);
        const imagePaths: string[] = form.value.imagePaths.split(/\n{2,}/g);

        status = (lyrics.length === imagePaths.length) ? null : {ldp: true};

        if (form.value.definitions !== '' && status === null) {
            const definitions: string[] = form.value.definitions.split(/\n{2,}/g);

            status = (lyrics.length === definitions.length) ? null : {ldp: true};
        }
        return status;
    };

    submitDPK(fg: FormGroup) {
        return new Promise<any>((resolve, reject) => {
            this.fireDB
                .collection(fg.value.dpk).doc(fg.value.title)
                .set({
                    lyrics: fg.value.lyrics.split(/\n{2,}/g),
                    definitions: fg.value.definitions.split(/\n{2,}/g),
                    imageNames: fg.value.imagePaths.split(/\n{2,}/g),
                    title: fg.value.title
                })
                .then(_ => _, err => reject(err));
        });
    }
}
