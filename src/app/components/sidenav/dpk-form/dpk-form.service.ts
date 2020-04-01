import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFirestore } from '@angular/fire/firestore';
import { FormGroup, ValidationErrors } from '@angular/forms';
import { FirebaseBhajan } from '../../../interfaces/bhajan';
import { firestore } from 'firebase/app';

@Injectable({
    providedIn: 'root'
})
export class DpkFormService {

    constructor(private fireDB: AngularFirestore, private afAuth: AngularFireAuth) {
    }

    validSubmission: (form: FormGroup) => Promise<ValidationErrors> = async (form: FormGroup) => {
        let status: ValidationErrors = null;

        const title = form.value.titleSection.title;

        const lyrics = form.value.bhajanSection.lyrics;
        const gujarati = form.value.bhajanSection.gujarati;
        const definitions = form.value.bhajanSection.definitions;

        const audioUploaded: boolean = form.value.materialSection.audioUploaded;
        const audioTimings = form.value.materialSection.audioTimings;
        const audioURL = form.value.materialSection.audioURL;

        if (title) {
            status = this.asciiTitle(title);
        }

        const lyricsArr: string[] = lyrics.split(/\n{2,}/g);

        if (!status && title && gujarati) {
            const gujaratiArr: string[] = gujarati.split(/\n{2,}/g);
            status = this.lengthValidate(lyricsArr, gujaratiArr);
        }

        if (!status && definitions !== '') {
            const definitionsArr: string[] = definitions.split(/\n{2,}/g);
            status = (lyricsArr.length === definitionsArr.length) ? null : { lyricsDef: true };
        }

        if (!status && title && audioUploaded) {
            const audioTimingsArr = audioTimings.split(/\n+/g);
            status = this.audioTimingValidate(lyricsArr, audioTimingsArr);
        }

        if (!status && title && audioUploaded) {
            if (this.verifyURL(audioURL) && this.paramsVerifyURL(audioURL)) status = { badURL: true };
        }
        return status;
    };

    async submitDPK(fg: FormGroup, editMode: boolean) {
        if (!editMode) {
            const title = this.fireDB.collection(`Lists`).doc(fg.value.titleSection.dpk);
            await title.update({ title: firestore.FieldValue.arrayUnion(fg.value.titleSection.title) });
        }
        const audioLink = this.parseAudioURL(fg.value.materialSection.audioURL);
        await new Promise(done => setTimeout(() => done(), 500));
        return this.fireDB
            .collection(fg.value.titleSection.dpk).doc(fg.value.titleSection.title)
            .set({
                lyrics: fg.value.bhajanSection.lyrics.split(/\n{2,}/g),
                gujarati: fg.value.bhajanSection.gujarati.split(/\n{2,}/g),
                definitions: fg.value.bhajanSection.definitions.split(/\n{2,}/g),
                title: fg.value.titleSection.title,
                audioLink,
                audioTimings: this.timingsToSeconds(fg.value.materialSection.audioTimings.split(/\n+/g)),
                author_uid: this.afAuth.auth.currentUser.uid,
            }, { merge: true });
    }

    parseAudioURL(audioURL: string) {
        if (!audioURL) return '';
        let audioLink: URL = new URL(audioURL);
        if (audioLink.searchParams.get('id')) return audioLink;
        else {
            audioLink = new URL(`https://drive.google.com/open`);
            const path = audioLink.pathname.split('/');
            audioLink.searchParams.set(`id`, path[3]);
            return audioLink.href;
        }
    }

    getOwnData(fg: FormGroup) {
        return this.fireDB.collection<FirebaseBhajan>(fg.value.titleSection.dpk,
            ref => ref.where('author_uid', '==', this.afAuth.auth.currentUser.uid)).valueChanges();
    }

    timingsToSeconds(audioTimings: string[]) {
        if (audioTimings === [ '' ]) {
            return '';
        }

        const secondsArr = [];
        for (const time of audioTimings) {
            let minutes;
            let seconds;
            [ minutes, seconds ] = time.split(':');
            seconds = +seconds;
            seconds += +minutes * 60;
            secondsArr.push(seconds);
        }
        return secondsArr;
    }

    asciiTitle(title: string) {
        if (/^[a-zA-Z\s]*$/.test(title))
            return null;
        return { badChars: true };
    }

    verifyURL(audioURL: string) {
        // Initial Style https://drive.google.com/drive/folders/1SGORrTaUwiRIekhS6j1obM28P4D7RlXq?usp=sharing
        try {
            const url = new URL(audioURL);
            const path = url.pathname.split('/');
            const hostname = url.hostname;
            let status = null;
            if (!(hostname === 'drive.google.com' && path[1] === 'drive' && path[2] === 'folders')) {
                status = { badURL: true };
            }
            return status;
        } catch {
            return { badURL: true };
        }
    }

    paramsVerifyURL(audioURL: string) {
        try {
            const url = new URL(audioURL);
            if (url.searchParams.get('id')) return null;
        } catch {
            return { badURL: true };
        }
    }

    audioTimingValidate(lyricsArr: string | any[], audioTimingsArr: any[]) {
        for (const time of audioTimingsArr) {
            if (!(/^\d{1,2}:\d{1,2}$/.test(time))) {
                return { IncorrectFormat: true };
            }
        }
        if (lyricsArr.length !== audioTimingsArr.length) {
            return { IncorrectSize: true };
        }
        return null;
    }

    lengthValidate(arr1: string[], arr2: any[]) {
        if (arr1.length !== arr2.length) {
            return { GujuIncorrectSize: true };
        }
        return null;
    }
}
