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
        if (form.value.imagesURL === null) {
            form.patchValue({imagesURL: ''});
        }
        if (form.value.definitions === null) {
            form.patchValue({definitions: ''});
        }

        if (!this.verifyURL(form.value.imagesURL)) {
            return {ldp: true};
        }

        const lyrics: string[] = form.value.lyrics.split(/\n{2,}/g);

        if (form.value.definitions !== '') {
            const definitions: string[] = form.value.definitions.split(/\n{2,}/g);

            status = (lyrics.length === definitions.length) ? null : {ldp: true};
        }
        return status;
    };

    submitDPK(fg: FormGroup) {
        this.fireDB
            .collection(fg.value.dpk).doc(fg.value.title)
            .set({
                lyrics: fg.value.lyrics.split(/\n{2,}/g),
                definitions: fg.value.definitions.split(/\n{2,}/g),
                imagesURL: fg.value.imagesURL,
                title: fg.value.title
            }).then(_ => _, err => console.error(err));
    }

    verifyURL(imagesURL: string) {
        // TODO Request URL and check length is same as Lyrics
        // Initial Style https://drive.google.com/drive/folders/1SGORrTaUwiRIekhS6j1obM28P4D7RlXq?usp=sharing
        try {
            const url = new URL(imagesURL);
            const path = url.pathname.split('/');
            const hostname = url.hostname;
            return hostname === 'drive.google.com' && path[1] === 'drive' && path[2] === 'folders';
        } catch {
            return false;
        }
    }

    openDPKSlides(form: FormGroup) {
        window.open('https://jayp0521.github.io/dpkProject/dpk/' + form.value.dpk + '/' + form.value.title, '_blank');
    }
}
