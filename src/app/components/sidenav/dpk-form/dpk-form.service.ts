import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFirestore } from '@angular/fire/firestore';
import { FormGroup, ValidationErrors } from '@angular/forms';
import { DriveAPIService } from '../../../services/drive-api.service';


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

        const title = form.value.title;
        const lyrics = form.value.lyrics;
        const gujarati = form.value.gujarati;
        const imagesURL = form.value.imagesURL;
        const definitions = form.value.definitions;
        const audioUploaded: boolean = form.value.audioUploaded;
        const audioTimings = form.value.audioTimings;

        if (lyrics === null) form.patchValue({ lyrics: '' });
        if (gujarati === null) form.patchValue({ gujarati: '' });
        if (imagesURL === null) form.patchValue({ imagesURL: '' });
        if (definitions === null) form.patchValue({ definitions: '' });
        if (audioTimings === null) form.patchValue({ audioTimings: '' });

        if (imagesURL) {
            await this.verifyURL(imagesURL).then(res => status = res);
        }

        if (!status && title) {
            await this.verifyTitleInDrive(form.value.title, this.DPKs.get(`${ form.value.dpk }`))
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
            .collection(fg.value.dpk).doc(fg.value.title)
            .set({
                lyrics: fg.value.lyrics.split(/\n{2,}/g),
                gujarati: fg.value.gujarati.split(/\n{2,}/g),
                definitions: fg.value.definitions.split(/\n{2,}/g),
                imagesURL: fg.value.imagesURL,
                title: fg.value.title,
                audioTimings: this.timingsToSeconds(fg.value.audioTimings.split(/\n{2,}/g)),
                author_uid: this.afAuth.auth.currentUser.uid,
            });
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
