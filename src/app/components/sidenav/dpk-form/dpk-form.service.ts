import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFirestore } from '@angular/fire/firestore';
import { FormGroup, ValidationErrors } from '@angular/forms';
import { DriveAPIService } from '../../../services/drive-api.service';
import { FirebaseBhajan } from '../../../interfaces/bhajan';


@Injectable({
    providedIn: 'root'
})
export class DpkFormService {

    DPKs = new Map<string, string>();

    constructor(private fireDB: AngularFirestore, private driveAPIService: DriveAPIService, private afAuth: AngularFireAuth) {
        this.getDPK();
    }

    validSubmission: (form: FormGroup) => Promise<ValidationErrors> = async (form: FormGroup) => {
        let status: ValidationErrors = null;

        const title = form.value.titleSection.title;
        const dpk = form.value.titleSection.dpk;

        const lyrics = form.value.bhajanSection.lyrics;
        const gujarati = form.value.bhajanSection.gujarati;
        const definitions = form.value.bhajanSection.definitions;

        const imagesURL = form.value.materialSection.imagesURL;
        const audioUploaded: boolean = form.value.materialSection.audioUploaded;
        const audioTimings = form.value.materialSection.audioTimings;

        if (imagesURL) {
            await this.verifyURL(imagesURL).then(res => status = res);
        }

        if (!status && title) {
            await this.verifyTitleInDrive(title, this.DPKs.get(`${ dpk }`))
                .then(res => status = (res.length !== 0) ? null : { titleNotInDrive: true });
        }

        const lyricsArr: string[] = lyrics.split(/\n{2,}/g);

        if (!status && title && gujarati) {
            const gujaratiArr: string[] = gujarati.split(/\n{2,}/g);
            status = this.lengthValidate(lyricsArr, gujaratiArr);
        }

        if (!status && title) {
            await this.photosEqualSlides(imagesURL, lyrics, audioUploaded).then(res => status = res);
        }


        if (!status && definitions !== '') {
            const definitionsArr: string[] = definitions.split(/\n{2,}/g);
            status = (lyricsArr.length === definitionsArr.length) ? null : { lyricsDef: true };
        }

        if (!status && title && audioUploaded) {
            const audioTimingsArr = audioTimings.split(/\n+/g);
            status = this.audioTimingValidate(lyricsArr, audioTimingsArr);
        }
        return status;
    };

    submitDPK(fg: FormGroup) {
        return this.fireDB
            .collection(fg.value.titleSection.dpk).doc(fg.value.titleSection.title)
            .set({
                lyrics: fg.value.bhajanSection.lyrics.split(/\n{2,}/g),
                gujarati: fg.value.bhajanSection.gujarati.split(/\n{2,}/g),
                definitions: fg.value.bhajanSection.definitions.split(/\n{2,}/g),
                imagesURL: fg.value.materialSection.imagesURL,
                title: fg.value.titleSection.title,
                audioTimings: this.timingsToSeconds(fg.value.materialSection.audioTimings.split(/\n+/g)),
                author_uid: this.afAuth.auth.currentUser.uid,
            }, { merge: true });
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

    async verifyTitleInDrive(title: string, dpkId: string) {
        let filesArr: { id: string; name: string }[] = [];
        await this.driveAPIService
            .getListOfFiles(`'${ dpkId }' in parents and mimeType = 'application/vnd.google-apps.folder' and name = '${ title }'`)
            .toPromise().then(files => filesArr = files.files);
        return filesArr;
    }

    async verifyURL(imagesURL: string) {
        // Initial Style https://drive.google.com/drive/folders/1SGORrTaUwiRIekhS6j1obM28P4D7RlXq?usp=sharing
        try {
            const url = new URL(imagesURL);
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

    async photosEqualSlides(imagesURL: string, lyrics: string, audioUploaded: boolean) {
        const url = new URL(imagesURL);
        const path = url.pathname.split('/');
        const id = path[3];
        let status = null;

        await this.driveAPIService.getListOfFiles(`'${ id }' in parents`).toPromise().then(
            files => {
                const filesArr = files.files;
                const imageArr: object[] = [];
                for (const item of filesArr) {
                    if (item.mimeType.split('/')[0] === 'image') {
                        imageArr.push(item);
                    }
                }
                if (lyrics.split(/\n{2,}/g).length !== imageArr.length) {
                    status = { NotEqualPhotos: true };
                }

                if (!status && audioUploaded) {
                    for (const item of filesArr) {
                        if (item.mimeType.split('/')[0] === 'audio') {
                            status = null;
                            return;
                        }
                        status = { AudioNotFound: true };
                    }
                }
            }
        );
        return status;
    }

    getDPK() {
        this.driveAPIService.getListOfFolders(`1NFdcrnJLViJgJyz9MiSxkCQOll3v5QnQ`)
            .subscribe(foldersObject => {
                const folders = foldersObject.files;
                for (const folder of folders) {
                    this.DPKs.set(folder.name, folder.id);
                }
            });
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
